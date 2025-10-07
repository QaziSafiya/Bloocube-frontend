import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Footer = () => {
  return (
         <footer className="relative z-10 border-t border-white/[0.06] px-6 py-16 backdrop-blur bg-white/[0.02]">
        <div className="max-w-7xl mx-auto text-gray-300 grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center mb-4">
              <div className="relative w-24 h-24">
                <Image
                  src="/logo.png"
                  alt="Bloocube Logo"
                  fill
                  className="object-contain p-1"
                />
              </div>
            </div>
            <p className="text-gray-400">Your social media workspace powered by AI.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Product</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Use Cases</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Resources</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Docs</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-10 text-center text-gray-500">
          <p>&copy; 2025 Bloocube. All rights reserved.</p>
        </div>
      </footer>
  )
}

export default Footer


