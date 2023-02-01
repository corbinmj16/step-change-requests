import {Fragment, useEffect, useRef, useState} from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckCircleIcon, ExclamationCircleIcon,  } from '@heroicons/react/24/outline'

export function Modal({
  isOpen,
  message,
  title,
  buttonText,
  handleConfirm,
  handleCancel,
  modalType = 'success',
}) {
  const buttonRef = useRef(null)
  const modalTypeMap = {
    'success': {
      icon: <CheckCircleIcon className="h-6 w-6 text-green-600" aria-hidden="true" />,
      bg_color: 'bg-green-100',
      button_color: 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
    },
    'warning': {
      icon: <ExclamationCircleIcon className="h-6 w-6 text-yellow-600" aria-hidden="true" />,
      bg_color: 'bg-yellow-100',
      button_color: 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500'
    },
    'danger': {
      icon: <ExclamationCircleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />,
      bg_color: 'bg-red-100',
      button_color: 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
    }
  }

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={buttonRef} onClose={handleCancel}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className={`mx - auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${modalTypeMap[modalType].bg_color} sm:mx-0 sm:h-10 sm:w-10`}>
                      {modalTypeMap[modalType].icon}
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                        {title}
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          {message}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className={`inline flex w-full justify-center rounded-md border border-transparent ${modalTypeMap[modalType].button_color} px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm`}
                    ref={buttonRef}
                    onClick={handleConfirm}
                  >
                    {buttonText}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}