import React  from "react";

export default function ModalSso(props) {

  return (

    <div className=''>

      <div id="login-popup" className="hidden mx-auto max-w-md">
        <div className="fixed bottom-0 inset-x-0 sm:inset-0 sm:flex sm:items-center sm:justify-center">
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-neutral-500 opacity-75"></div>
          </div>

          <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full"
              role="dialog" aria-modal="true" aria-labelledby="modal-headline">
            <iframe className="w-full max-h-screen" id="sso-iframe" src="" style={{height: '773px'}}></iframe>
          </div>
        </div>
      </div>

    </div>
  )


}
