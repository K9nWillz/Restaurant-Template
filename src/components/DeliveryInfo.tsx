import { Truck, Map, Clock } from 'lucide-react';

export function DeliveryInfo() {
  return (
    <section className="py-20 bg-primary-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <Map size={32} />
            </div>
            <h3 className="text-2xl font-serif font-bold">Delivery Zones</h3>
            <p className="text-primary-100">
              We currently deliver within a 10-mile radius of our flagship store. Check your zipcode at checkout.
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <Truck size={32} />
            </div>
            <h3 className="text-2xl font-serif font-bold">Fast & Fresh</h3>
            <p className="text-primary-100">
              Estimated delivery time is 30-45 minutes. Your food is packed in thermal-insulated bags to ensure it arrives hot.
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <Clock size={32} />
            </div>
            <h3 className="text-2xl font-serif font-bold">Service Hours</h3>
            <p className="text-primary-100">
              Delivery is available from 8:00 AM to 9:30 PM daily. Pre-orders can be scheduled up to 2 days in advance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
