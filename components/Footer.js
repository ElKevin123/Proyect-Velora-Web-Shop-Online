export default function Footer() {
  return (
    <footer className="bg-[#111111] text-[#999999] py-16 px-6 md:px-12 font-sans mt-auto">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        
        <div className="col-span-1 md:col-span-1 flex flex-col gap-4">
          <h2 className="text-3xl font-bold font-serif text-white tracking-tighter">Velora.</h2>
          <p className="text-sm leading-relaxed max-w-xs mt-2">
            Curating rare objects and timeless essentials for the modern sanctuary.
          </p>
        </div>

        <div>
          <h3 className="text-white text-xs font-bold tracking-widest uppercase mb-6">Shop</h3>
          <ul className="flex flex-col gap-4 text-sm">
            <li><a href="#" className="hover:text-white transition-colors duration-300">New Arrivals</a></li>
            <li><a href="#" className="hover:text-white transition-colors duration-300">Catalog</a></li>
            <li><a href="#" className="hover:text-white transition-colors duration-300">Limited Series</a></li>
            <li><a href="#" className="hover:text-white transition-colors duration-300">Archive</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white text-xs font-bold tracking-widest uppercase mb-6">Atelier</h3>
          <ul className="flex flex-col gap-4 text-sm">
            <li><a href="#" className="hover:text-white transition-colors duration-300">Our Story</a></li>
            <li><a href="#" className="hover:text-white transition-colors duration-300">Artisans</a></li>
            <li><a href="#" className="hover:text-white transition-colors duration-300">Process</a></li>
            <li><a href="#" className="hover:text-white transition-colors duration-300">Journal</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white text-xs font-bold tracking-widest uppercase mb-6">Support</h3>
          <ul className="flex flex-col gap-4 text-sm">
            <li><a href="#" className="hover:text-white transition-colors duration-300">Shipping</a></li>
            <li><a href="#" className="hover:text-white transition-colors duration-300">Returns</a></li>
            <li><a href="#" className="hover:text-white transition-colors duration-300">Care Guide</a></li>
            <li><a href="#" className="hover:text-white transition-colors duration-300">Contact</a></li>
          </ul>
        </div>

      </div>

      <div className="max-w-[1400px] mx-auto border-t border-[#333333] pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] tracking-[0.2em] uppercase font-semibold">
        <p>© {new Date().getFullYear()} VELORA ATELIER. ALL RIGHTS RESERVED.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-white transition-colors duration-300">Instagram</a>
          <a href="#" className="hover:text-white transition-colors duration-300">Pinterest</a>
        </div>
      </div>
    </footer>
  );
}