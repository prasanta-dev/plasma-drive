import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import addServices from '../../services/AddServices';
import { clearCart, removeFromCart } from '../../redux/features/cartSlice';
import { Link } from 'react-router-dom';
import emptyCart from '../../assets/emptyCart.gif'
import FormUI from '../../components/Form/FormUI';
import useServiceDetails from '../../hook/useServiceDetails';
import DeleteBtn from '../../components/DeleteBtn/DeleteBtn';
import booking from '../../services/BookingService';
import defaultImg from '../../assets/defaultImg.jpg'
import Toast from '../../components/Toast/Toast';
import { LuInfo, LuChevronDown } from 'react-icons/lu'

function AddToCart() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const { userData } = useSelector((state) => state.auth);

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');

  // Terms checkboxes
  const [agreedToService, setAgreedToService] = useState(false);
  const [agreedToVisiting, setAgreedToVisiting] = useState(false);

  // Terms text — collapsed by default, expandable on tap
  const [showServiceInfo, setShowServiceInfo] = useState(false);
  const [showVisitingInfo, setShowVisitingInfo] = useState(false);

  // Pricing info box — collapsed by default, expandable on tap
  const [showPricingInfo, setShowPricingInfo] = useState(false);


  // Toast state
  const [toast, setToast] = useState({ show: false, type: 'success', title: '', message: '' })

  const { services, loading } = useServiceDetails();

  const showToast = (type, title, msg) => {
    setToast({ show: true, type, title, message: msg })
  }
  const hideToast = () => setToast((t) => ({ ...t, show: false }))

  useEffect(() => {
    if (!toast.show) return
    const timer = setTimeout(hideToast, 5000)
    return () => clearTimeout(timer)
  }, [toast.show])

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (items.length === 0) return;
    if (!agreedToService || !agreedToVisiting) return;

    try {
      await Promise.all(
        items.map((item) =>
          booking.addBooking({
            userId: userData.id,
            customerName: name,
            phone: number,
            address,
            imageId: item.imageId,
            serviceName: item.slug,
            problemDescription: message,
            bookingStatus: 'Pending',
            price: item.price,
          })
        )
      );

      setName('');
      setNumber('');
      setAddress('');
      setMessage('');
      setAgreedToService(false);
      setAgreedToVisiting(false);
      dispatch(clearCart());
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

  useEffect(() => {
    document.body.style.overflow = isPanelOpen ? 'hidden' : 'unset';
  }, [isPanelOpen])

  const bothAgreed = agreedToService && agreedToVisiting

  return (
    <>
      <section>
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-10 lg:px-60">
          <ul className="space-y-4">

            {items.length === 0 && (
              <div className='flex justify-center flex-col items-center'>
                <img src={emptyCart} className='w-15' alt="" />
                <p className="text-gray-500">Your cart is empty.</p>
              </div>
            )}

            {items.map((item) => (
              <li key={item.$id} className="flex items-center gap-4">
                <img
                  src={item.imageId ? addServices.getFilePreview(item.imageId) : defaultImg}
                  alt=""
                  className="size-16 sm:size-26 rounded-sm object-cover"
                />
                <div>
                  <h3 className="text-sm sm:text-xl text-gray-900 capitalize">{item.title}</h3>
                  <div className="mt-0.5 space-y-px text-[10px] sm:text-[14px] text-gray-600">
                    <div className='flex flex-col'>
                      <p>Description: {item.description}</p>
                      <span>Category: {item.category.toUpperCase()}</span>
                      <span className="text-primary-600 text-xs font-medium mt-1">
                        Starting at ₹{item.price} — final cost confirmed after inspection
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-1 items-center justify-end gap-2">
                  <button
                    onClick={() => dispatch(removeFromCart(item.$id))}
                    className="text-gray-600 transition hover:text-red-600 cursor-pointer"
                  >
                    <span className="sr-only">Remove item</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 sm:size-7">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* Pricing section — honest, no fake totals */}
          <div className="mt-2 space-y-3 border-t border-gray-100 pt-8">

            {/* Trust strip — removes booking-cost hesitation up front */}
            {items.length > 0 && (
              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 rounded-lg border border-primary-100 bg-primary-50/50 px-3 py-2 text-xs font-medium text-primary-700 sm:text-sm">
                <span>₹0 Booking Fee</span>
                <span className="text-primary-300">•</span>
                <span>No Advance Payment</span>
                <span className="text-primary-300">•</span>
                <span>Pay Only After Inspection</span>
              </div>
            )}

            {/* Visiting charge info box */}
            {items.length > 0 && (
              <div className="rounded-xl border border-primary-200 bg-primary-50 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setShowPricingInfo((v) => !v)}
                  className="w-full flex items-center gap-3 p-4 text-left cursor-pointer"
                >
                  <LuInfo className="text-primary-600 text-xl shrink-0" />
                  <span className="flex-1 text-sm font-semibold text-primary-800">How pricing works</span>
                  <LuChevronDown
                    className={`text-primary-600 text-lg shrink-0 transition-transform duration-300 ${showPricingInfo ? 'rotate-180' : ''
                      }`}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${showPricingInfo ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                >
                  <div className="px-4 pb-4 pl-12 text-sm text-primary-800 space-y-1">
                    <p>Booking is completely free — you only pay after our technician visits, inspects the appliance, and gives you a transparent repair estimate. No hidden charges.</p>
                    <p>A visiting charge of <span className="font-semibold">₹250 – ₹500</span> applies only if you choose not to proceed after inspection. This amount is <span className="font-semibold">deducted from your repair cost</span> if you book this repair again within 7 days.</p>
                  </div>
                </div>
              </div>
            )}


            <dl className="ml-auto max-w-sm space-y-2 text-sm text-gray-700">
              <div className="flex justify-between">
                <dt>Services requested</dt>
                <dd className="font-medium">{items.length}</dd>
              </div>
              <div className="flex justify-between items-start">
                <dt>Visiting charge</dt>
                <dd className="font-medium text-right">
                  { items.length === 0 ? "₹0" : "₹250 – ₹500"}
                  <span className="block text-[10px] font-normal text-gray-400">Refunded if you proceed</span>
                </dd>
              </div>
              <div className="flex justify-between border-t border-gray-100 pt-2 font-semibold text-gray-900">
                <dt>Repair cost</dt>
                <dd>After Inspection</dd>
              </div>
            </dl>

            <div className="flex items-center justify-end gap-4">
              <button
                onClick={() => dispatch(clearCart())}
                className="block rounded-sm border border-gray-300 bg-gray-50 px-5 py-3 text-sm text-gray-700 transition-colors hover:text-gray-900 cursor-pointer"
              >
                {`Remove All (${items.length})`}
              </button>

              <button
                onClick={() => setIsPanelOpen(true)}
                disabled={items.length === 0}
                className="block rounded-sm border border-primary-600 bg-primary-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-primary-700 hover:bg-primary-700 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Request Service
              </button>
            </div>

            {items.length > 0 && (
              <p className="text-right text-xs text-gray-400">No payment required to book</p>
            )}

            <div className="text-right">
              <Link to={'/services'} className="inline-block text-sm text-gray-600 underline underline-offset-4 transition-colors hover:text-gray-700">
                Continue shopping
              </Link>
            </div>
          </div>
        </div>
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
            <h2 className="text-xl font-bold text-neutral-900">Confirm your request</h2>
            <p className="text-sm text-neutral-500 mt-1">
              We'll call you to schedule a visit.
            </p>
          </div>

          {/* Services summary inside panel */}
          <div className="mb-5 p-3 rounded-xl bg-white border border-gray-200 shadow-sm">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Services</p>
            <div className="flex flex-wrap gap-2">
              {items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-primary-50 border border-primary-200 text-primary-800 text-xs font-medium px-2.5 py-1 rounded-full capitalize">
                  {item.title}
                  <button
                    type="button"
                    onClick={() => dispatch(removeFromCart(item.$id))}
                    className="text-primary-400 hover:text-primary-700 cursor-pointer"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
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

            <FormUI
              inputAttribute='textArea'
              htmlFor='problemMessage'
              id='problemMessage'
              type='text'
              rows={2}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              lableText='Describe the problem (optional)'
              placeholder='e.g. washing machine not spinning...'
            />

            {/* Terms & Conditions */}
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
                disabled={!bothAgreed || items.length === 0}
                className="flex-1 bg-[#1c1b1a] text-white font-semibold rounded-md text-sm px-4 py-2.5 transition hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                Confirm Service Request
              </button>

              <button
                onClick={() => setIsPanelOpen(false)}
                type='button'
                className="px-4 py-2.5 rounded-md text-sm font-medium border border-gray-300 text-gray-700 hover:bg-gray-100 transition cursor-pointer"
              >
                Cancel
              </button>
            </div>

            {!bothAgreed && items.length > 0 && (
              <p className="text-xs text-gray-400 mt-2 text-center">
                Please agree to both terms above to continue.
              </p>
            )}
          </form>
        </div>
      </section>

      {/* Toast notification */}
      <Toast
        show={toast.show}
        type={toast.type}
        title={toast.title}
        message={toast.message}
        onClose={hideToast}
      />
    </>
  )
}

export default AddToCart