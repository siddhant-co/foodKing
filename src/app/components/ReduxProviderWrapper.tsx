// "use client";

// import { Provider } from "react-redux";

// import { persistor, store } from "../../../store/store";
// import { PersistGate } from "redux-persist/integration/react";

// export default function ReduxProviderWrapper({ children }: { children: React.ReactNode }) {
//   return (
//     <Provider store={store}>
//       <PersistGate
//         loading={
//           <div className="p-4 text-center text-gray-500">
//             Restoring session from local storage...
//           </div>
//         }
//         persistor={persistor}
//       >
//         {children}
//       </PersistGate>
//     </Provider>
//   );
// }


"use client";

import { Provider } from "react-redux";
import { persistor, store } from "../../../store/store";
import { PersistGate } from "redux-persist/integration/react";

export default function ReduxProviderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate
        loading={
          <div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#e7000b] border-t-transparent"></div>
          </div>
        }
        persistor={persistor}
      >
        {children}
      </PersistGate>
    </Provider>
  );
}
