import React, { useEffect, useState } from 'react'
import ServicesCard from '../../components/ServiceCard/ServiceCard'
import { useDispatch, useSelector } from 'react-redux';
import booking from '../../services/BookingService';
import ServicesCardSkeleton from '../../components/SkeletonCard/ServicesCardSkeleton';
import useServiceDetails from '../../hook/useServiceDetails';
import FormUI from '../../components/Form/FormUI';
import { setSearchQuery } from '../../redux/features/searchSlice';
import Toast from '../../components/Toast/Toast';


function Services({ limit }) {

  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const { userData } = useSelector((state) => state.auth)
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [address, setAddress] = useState('');
  const [service, setService] = useState("");
  const [image, setImage] = useState('');
  const [message, setMessage] = useState('');
  const [randomServices, setRandomServices] = useState([]);

  // Terms checkboxes
  const [agreedToService, setAgreedToService] = useState(false);
  const [agreedToVisiting, setAgreedToVisiting] = useState(false);

  // Terms text — collapsed by default, expandable on tap
  const [showServiceInfo, setShowServiceInfo] = useState(false);
  const [showVisitingInfo, setShowVisitingInfo] = useState(false);

  // Toast
  const [toast, setToast] = useState({ show: false, type: 'success', title: '', message: '' })

  const { services, loading, filteredServices } = useServiceDetails();
  const searchQuery = useSelector((state) => state.search.query);
  const { selectService } = useSelector((state) => state.selectService);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!limit) return; // full services page: no randomization needed, uses filteredServices directly
    if (loading || filteredServices.length === 0) return;
    if (randomServices.length > 0) return; // already picked, don't redo it

    const shuffled = [...filteredServices];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setRandomServices(shuffled.slice(0, limit));
  }, [loading, limit]);

  // const displayedServices = limit ? filteredServices.slice(0, limit) : filteredServices;
  const displayedServices = limit ? randomServices : filteredServices;

  const showToast = (type, title, msg) => setToast({ show: true, type, title, message: msg })
  const hideToast = () => setToast((t) => ({ ...t, show: false }))

  useEffect(() => {
    if (!toast.show) return
    const timer = setTimeout(hideToast, 5000)
    return () => clearTimeout(timer)
  }, [toast.show])

  useEffect(() => {
    document.body.style.overflow = isPanelOpen ? 'hidden' : 'unset';
  }, [isPanelOpen])

  useEffect(() => {
    if (isPanelOpen && selectService?.slug) {
      setService(selectService.slug);
      setImage(selectService.imageId);
    }
  }, [isPanelOpen, selectService]);

  useEffect(() => {
    if (!service) return;
    const matched = services.find((item) => item.slug === service);
    if (matched) setImage(matched.imageId);
  }, [service, services]);

  // Reset terms when panel closes
  useEffect(() => {
    if (!isPanelOpen) {
      setAgreedToService(false);
      setAgreedToVisiting(false);
    }
  }, [isPanelOpen])

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!agreedToService || !agreedToVisiting) return;

    try {
      await booking.addBooking({
        userId: userData.id,
        customerName: name,
        phone: number,
        address,
        imageId: image,
        serviceName: service,
        problemDescription: message,
        bookingStatus: 'Pending',
        price: selectService.price,
      });

      setName('');
      setNumber('');
      setAddress('');
      setService('');
      setMessage('');
      setAgreedToService(false);
      setAgreedToVisiting(false);
      setIsPanelOpen(false);

      showToast(
        'success',
        'Request received!',
        'Our team will call you within 24 hours to confirm your appointment.'
      )
    } catch (error) {
      console.log(error);
      showToast('error', 'Something went wrong', 'Please try again or call us directly.')
    }
  };

  const bothAgreed = agreedToService && agreedToVisiting

  return (
    <div className='relative overflow-hidden'>

      {/* Search Bar */}
      {!limit && (
        <div className="flex justify-center mt-1 mb-2 px-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            placeholder="Search services..."
            className="lg:hidden w-full max-w-md px-4 py-2 border-2 border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent transition-all"
          />
        </div>
      )}

      <section className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-10 gap-x-10 mt-5 mb-5">
        {loading
          ? Array(6).fill(0).map((_, i) => <ServicesCardSkeleton key={i} />)
          : displayedServices.length > 0
            ? displayedServices.map((service, idx) => (
              <ServicesCard key={idx} service={service} panelOpen={setIsPanelOpen} />
            ))
            : <p className="col-span-3 text-center text-gray-400 mt-10">No services found.</p>
        }
      </section>

      {/* Overlay */}
      {isPanelOpen && (
        <div
          className='fixed inset-0 bg-black/60 z-40'
          onClick={() => setIsPanelOpen(false)}
        />
      )}

      {/* Sliding panel */}
      <section
        className={`fixed top-0 right-0 z-50 bg-[#ecf8f8] h-full w-full px-2 md:px-0 md:w-105 transition-transform duration-300 overflow-y-auto ${isPanelOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="max-w-sm mx-auto py-6">

          {/* Panel header */}
          <div className="mb-5">
            <h2 className="text-xl font-bold text-neutral-900">Book a service</h2>
            <p className="text-sm text-neutral-500 mt-1">We'll call you to schedule a visit.</p>
          </div>

          <form onSubmit={handleBookingSubmit}>
            <FormUI
              lableText='Your Name'
              type="text"
              htmlFor="name"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={`Hello ${userData?.name || ''}...`}
              requried
            />

            <FormUI
              htmlFor='phoneNumber'
              id='phoneNumber'
              type='text'
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              lableText='Phone Number'
              maxLength={10}
              placeholder='9999999999'
              requried
            />

            <FormUI
              inputAttribute='textArea'
              htmlFor='address'
              id='address'
              type='text'
              rows={2}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              lableText='Address'
              placeholder='Write your address here...'
              requried
            />

            {/* Service dropdown */}
            <div className='flex flex-col relative group mb-4'>
              <label htmlFor="service" className="text-blue-500 text-[16px] font-semibold relative top-2 ml-3 px-1 bg-[#fefefe] w-fit rounded border shadow-md">
                Select a service
              </label>
              <select
                id="service"
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="border-gray-200 input px-2.5 py-2.75 text-[17px] bg-[#ffffff] border-2 rounded-[5px] shadow-md focus:border-transparent focus:ring-3 focus:ring-indigo-300 focus:outline-none transition-all duration-300 delay-200"
                required
              >
                <option value="" disabled>Choose a service</option>
                {services.map((item) => (
                  <option key={item.$id} value={item.slug}>
                    {item.title || item.slug}
                  </option>
                ))}
              </select>
            </div>

            <FormUI
              inputAttribute='textArea'
              htmlFor='problemMessage'
              id='problemMessage'
              type='text'
              rows={2}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              lableText='Describe the problem (optional)'
              placeholder='e.g. not turning on, making noise...'
            />

            {/* Terms */}
            <div className="mb-5 space-y-3">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Terms & Conditions</p>

              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={agreedToService}
                  onChange={(e) => setAgreedToService(e.target.checked)}
                  className="mt-1 w-4 h-4 accent-primary-600 cursor-pointer shrink-0"
                />
                <span className="text-sm text-gray-700 leading-relaxed">
                  I understand this is a <span className="font-semibold">service request, not a confirmed booking.</span>{' '}
                  {showServiceInfo && (
                    <span className="text-gray-500">A technician will visit my location and provide the final repair estimate on-site. </span>
                  )}
                  <button
                    type="button"
                    onClick={(e) => { e.preventDefault(); setShowServiceInfo((v) => !v) }}
                    className="text-primary-600 font-medium hover:underline"
                  >
                    {showServiceInfo ? 'Show less' : 'Read more'}
                  </button>
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={agreedToVisiting}
                  onChange={(e) => setAgreedToVisiting(e.target.checked)}
                  className="mt-1 w-4 h-4 accent-primary-600 cursor-pointer shrink-0"
                />
                <span className="text-sm text-gray-700 leading-relaxed">
                  I agree to the <span className="font-semibold">visiting charge policy.</span>{' '}
                  {showVisitingInfo && (
                    <span className="text-gray-500">₹250 to ₹500 applies if I choose not to proceed after inspection. This amount is deducted from my repair cost if I book this repair again within 7 days. </span>
                  )}
                  <button
                    type="button"
                    onClick={(e) => { e.preventDefault(); setShowVisitingInfo((v) => !v) }}
                    className="text-primary-600 font-medium hover:underline"
                  >
                    {showVisitingInfo ? 'Show less' : 'Read more'}
                  </button>
                </span>
              </label>
            </div>

            <div className='flex gap-2'>
              <button
                type="submit"
                disabled={!bothAgreed}
                className="flex-1 bg-[#1c1b1a] text-white font-semibold rounded-md text-sm px-4 py-2.5 transition hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                Confirm Request
              </button>

              <button
                onClick={() => setIsPanelOpen(false)}
                type='button'
                className="px-4 py-2.5 rounded-md text-sm font-medium border border-gray-300 text-gray-700 hover:bg-gray-100 transition cursor-pointer"
              >
                Cancel
              </button>
            </div>

            {!bothAgreed && (
              <p className="text-xs text-gray-400 mt-2 text-center">
                Please agree to both terms above to continue.
              </p>
            )}
          </form>
        </div>
      </section>

      {/* Toast */}
      <Toast
        show={toast.show}
        type={toast.type}
        title={toast.title}
        message={toast.message}
        onClose={hideToast}
      />
    </div>
  )
}

export default Services
