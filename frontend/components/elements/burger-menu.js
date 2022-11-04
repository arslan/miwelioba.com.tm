import { Menu } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import { Fragment, useState } from 'react';
import CustomLink from './custom-link';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';

export default function BurgerMenu({ navbar }) {
  const [customOpen, setCustomIsOpen] = useState(false);

  // Animations
  const variants = {
    hidden: { opacity: 0 },
    enter: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <div className="z-50 flex flex-col justify-center lg:hidden">
      <Menu>
        <Menu.Button onClick={() => setCustomIsOpen(!customOpen)}>
          <Bars3Icon className="w-6 h-6" />
        </Menu.Button>
        <AnimatePresence>
          {customOpen && (
            <motion.div
              variants={variants} // Pass the variant object into Framer Motion
              initial="hidden" // Set the initial state to variants.hidden
              animate="enter" // Animated state to variants.enter
              exit="exit" // Exit state (used later) to variants.exit
              transition={{ type: 'linear' }}
            >
              <Menu.Items
                static
                className="fixed z-[9999999] top-0 right-0 w-screen h-screen bg-white flex flex-col justify-center gap-12 font-bold"
              >
                <button
                  className="absolute w-8 h-8 text-orange top-5 right-7"
                  onClick={() => setCustomIsOpen(!customOpen)}
                >
                  <XMarkIcon />
                </button>
                {navbar.links.map((navLink) => (
                  <Menu.Item key={navLink.id} as={Fragment}>
                    <CustomLink
                      className="mx-auto text-2xl text-orange"
                      link={navLink}
                    >
                      <button onClick={() => setCustomIsOpen(!customOpen)}>
                        {navLink.text}
                      </button>
                    </CustomLink>
                  </Menu.Item>
                ))}
              </Menu.Items>
            </motion.div>
          )}
        </AnimatePresence>
      </Menu>
    </div>
  );
}
