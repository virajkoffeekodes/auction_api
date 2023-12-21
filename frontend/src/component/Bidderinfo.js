// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// const Bidderinfo = () => {
//   const [allBidder, setAllbidder] = useState({});
//   const [modal, setmodal] = useState(false);
//   const params = useParams();

//   //for getting the bidder
//   const getBidder = async () => {
//     // console.log(id, "id");
//     let result = await axios.get(
//       `http://localhost:8000/allbidder/${params.id}`
//     );
//     console.log(result);
//     setAllbidder(result.data);
//     setmodal(true);
//   };

//   const close = () => {
//     setmodal(false);
//   };
//   useEffect(() => {
//     getBidder();
//   }, []);

//   return (
//     <>
//       <div>
//         {modal && (
//           <div className="modal-product">
//             {allBidder.length > 0
//               ? allBidder.map((item, index) => (
//                   <ul>
//                     <li>
//                       Firstname:{item.firstname}
//                       <br />
//                       Lastname:{item.lastname}
//                     </li>
//                     <br />
//                   </ul>
//                 ))
//               : "No Bidder"}
//             <div>
//               <button onClick={close}>Done</button>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default Bidderinfo;
