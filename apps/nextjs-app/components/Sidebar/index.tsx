// 'use client';
//
// import React, {useContext} from 'react';
// import {GlobalStateContext} from '@/components/AppClientSide';
// import {useActor} from '@xstate/react';
// import {motion, AnimatePresence} from "framer-motion";
//
// const Sidebar = () => {
//     // https://flowbite.com/docs/components/sidebar/
//
//     const appService = useContext(GlobalStateContext).appService;
//
//     const [state, send] = useActor(appService);
//
//     const {sidebarOpen, activeTab} = state.context;
//
//     // if (!sidebarOpen) return null;
//
//     const variants = {
//         // TODO: Rename to hidden and visible
//         open: {x: 0, transition: {duration: 0.2, ease: 'easeInOut'}},
//         closed: {x: -300, transition: {duration: 1, ease: 'easeInOut'}},
//     }
//
//     return (
//         <>
//             <div
//                 className={`fixed top-0 left-0 z-30 w-full h-full bg-black opacity-50 transition-opacity sm:hidden ${
//                     sidebarOpen ? 'opacity-50' : 'opacity-0'
//                 }`}
//             />
//             <AnimatePresence>
//                 <motion.aside
//                     initial={'closed'}
//                     animate={'open'}
//                     variants={variants}
//                     exit={'closed'}
//                     transition={{duration: 0.2, ease: 'easeInOut'}}
//                     className={
//                         'fixed sm:static top-0 left-0 z-40 max-w-xs w-64 transition-transform-translate-x-full sm:translate-x-0 h-screen'
//                     }
//                 >
//                     <div className={'flex flex-col h-screen items-start px-4 py-2 bg-gray-50 pt-12 sm:pt-4'}>
//                         <ul>
//                             <li
//                                 className={activeTab === 'inbox' ? 'font-bold' : ''}
//                                 onClick={() =>
//                                     send({
//                                         type: 'SET_ACTIVE_TAB',
//                                         payload: 'inbox',
//                                     })
//                                 }
//                             >
//                                 Inbox
//                             </li>
//                             <li
//                                 className={activeTab === 'today' ? 'font-bold' : ''}
//                                 onClick={() =>
//                                     send({
//                                         type: 'SET_ACTIVE_TAB',
//                                         payload: 'today',
//                                     })
//                                 }
//                             >
//                                 Today
//                             </li>
//                             <li
//                                 className={activeTab === 'completed' ? 'font-bold' : ''}
//                                 onClick={() =>
//                                     send({
//                                         type: 'SET_ACTIVE_TAB',
//                                         payload: 'completed',
//                                     })
//                                 }
//                             >
//                                 Completed
//                             </li>
//                         </ul>
//                     </div>
//                 </motion.aside>
//             </AnimatePresence>
//         </>
//     );
// };
//
// export default Sidebar;

import React, { useContext } from 'react';
import { GlobalStateContext } from '@/components/AppClientSide';
import { useActor } from '@xstate/react';
import { AnimatePresence, motion } from 'framer-motion';

const Sidebar = () => {
  const appService = useContext(GlobalStateContext).appService;

  const [state, send] = useActor(appService);

  const { sidebarOpen, activeTab } = state.context;

  const variants = {
    visible: { x: 0, transition: { duration: 0.2, ease: 'easeIn' } },
    hidden: { x: -300, transition: { duration: 0.2, ease: 'easeOut' } },
  };

  return (
    <>
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            key="bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="fixed top-0 left-0 z-30 w-full h-full bg-black opacity-50 sm:hidden"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            key="sidebar"
            initial="hidden"
            animate="visible"
            variants={variants}
            exit="hidden"
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="fixed sm:static top-0 left-0 z-40 max-w-xs w-64 transition-transform-translate-x-full sm:translate-x-0 h-screen"
          >
            <div className="flex flex-col h-screen items-start px-4 py-2 bg-gray-50 pt-12 sm:pt-4">
              <ul>
                <li
                  className={activeTab === 'inbox' ? 'font-bold' : ''}
                  onClick={() =>
                    send({
                      type: 'SET_ACTIVE_TAB',
                      payload: 'inbox',
                    })
                  }
                >
                  Inbox
                </li>
                <li
                  className={activeTab === 'today' ? 'font-bold' : ''}
                  onClick={() =>
                    send({
                      type: 'SET_ACTIVE_TAB',
                      payload: 'today',
                    })
                  }
                >
                  Today
                </li>
                <li
                  className={activeTab === 'completed' ? 'font-bold' : ''}
                  onClick={() =>
                    send({
                      type: 'SET_ACTIVE_TAB',
                      payload: 'completed',
                    })
                  }
                >
                  Completed
                </li>
              </ul>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
