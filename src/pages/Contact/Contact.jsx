import React from 'react'

function Contact() {
  return (
    <section className="bg-none">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:py-8 lg:px-25">
        <div className="max-w-2xl lg:max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-gray-900/80 font-poppins">Visit Our Location</h2>
          <p className="mt-4 text-lg text-gray-500 text-center">Get in touch and let me know how I can help. <br className='hidden sm:block' /> Just call or email us and I’ll be in touch as soon as possible. </p>
        </div>
        <div className="mt-8 lg:mt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7376.87938574601!2d88.4139137!3d22.4124707!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a026d5574b888ed%3A0x8dd57cabe7130393!2sPradip%20Debnath%20(Electrical%20repair%20shop)!5e0!3m2!1sen!2sin!4v1780820810727!5m2!1sen!2sin" width="100%"
                height="480"
                allowFullScreen=""
                loading="lazy" style={{ border: 0 }}></iframe>
            </div>
            <div>
              <div className="max-w-full mx-auto rounded-lg overflow-hidden">
                <div className="px-6 py-4">
                  <h3 className="text-lg font-medium text-gray-900">Our Address</h3>
                  <p className="mt-1 text-gray-600">Haraharitala Ganga Ghat, near srijoni complex, Vivekananda Pally, Harinavi, Kolkata, Rajpur Sonarpur, West Bengal 700148</p>
                </div>
                <div className="border-t border-gray-200 px-6 py-4">
                  <h3 className="text-lg font-medium text-gray-900">Hours</h3>
                  <p className="mt-1 text-gray-600">Monday - Sunday: 11:00am - 9:00pm</p>
                </div>
                <div className="border-t border-gray-200 px-6 py-4">
                  <h3 className="text-lg font-medium text-gray-900">Contact</h3>
                  <p className="mt-1 text-gray-600">Email: praneswar0000@gmail.com</p>
                  <p className="mt-1 text-gray-600">Phone: +91 9433219945</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact