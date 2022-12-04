import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import CustomLink from './custom-link';
import { Dialog } from '@headlessui/react';
import { useState } from 'react';

export default function BurgerMenu({ navbar }) {
  let [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative z-50 flex flex-col justify-center overflow-hidden lg:hidden">
      <button onClick={() => setIsOpen(true)} className="outline-none ring-0">
        <Bars3Icon className="w-6 h-6" />
      </button>
      {isOpen && (
        <Dialog static open={isOpen} onClose={() => setIsOpen(false)}>
          <Dialog.Panel>
            <div className="fixed z-[9999] top-0 right-0 flex flex-col justify-center w-screen h-screen gap-12 font-bold bg-orange">
              <button
                className="absolute w-8 h-8 text-white outline-none top-5 right-7 ring-0"
                onClick={() => setIsOpen(false)}
              >
                <XMarkIcon />
              </button>
              {navbar.links.map((navLink) => (
                <div key={navLink.id} className="flex flex-col">
                  <CustomLink
                    className="mx-auto text-2xl text-white"
                    link={navLink}
                  >
                    <button
                      onClick={() => setCustomIsOpen(!customOpen)}
                      className="mx-auto text-2xl text-white uppercase"
                    >
                      {navLink.text}
                    </button>
                  </CustomLink>
                </div>
              ))}
            </div>
          </Dialog.Panel>
        </Dialog>
      )}
    </div>
  );
}
