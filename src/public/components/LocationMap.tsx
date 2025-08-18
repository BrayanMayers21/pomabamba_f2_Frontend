export default function LocationMap() {
  return (
    <section className="py-8 px-4">
      <h2 className="text-2xl font-bold text-center text-green-600 mb-6">NUESTRA UBICACIÓN</h2>

      <div className="max-w-4xl mx-auto border border-green-600 rounded-lg overflow-hidden shadow">
        <iframe
          title="UGEL Pomabamba"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3942.6606011108634!2d-77.46387902410015!3d-8.81792009021492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91aecf48d39724f3%3A0xf61bbbd907acdb0f!2sUnidad%20de%20Gesti%C3%B3n%20Educativa%20-%20UGEL!5e0!3m2!1ses-419!2spe!4v1751777655251!5m2!1ses-419!2spe"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      
    </section>
  );
}
