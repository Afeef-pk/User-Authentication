import { useEffect, useState } from "react";
import axios from "axios";
import {toast} from "react-hot-toast"


function Profile() {
  const [userData, setUserData] = useState({});
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .get("http://localhost:4000/api/profile", { headers })
        .then(({ data }) => {
          setUserData(data.user);
        })
        .catch(({response}) => {
          toast.error(response.data.message);
        });
    }
  }, []);

  return (
    <section className="pt-16 bg-gray-50">
      <div className="w-full lg:w-4/12 px-4 mx-auto">
        <div className="relative flex flex-col min-w-0 break-words bg-gray-300 w-full mb-6 shadow-xl rounded-lg mt-16">
          <div className="px-6">
            <div className="flex flex-wrap justify-center">
              <div className="w-full px-4 flex justify-center">
                <div className="relative mt-10">
                  <img
                    alt="dfs"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/768px-Windows_10_Default_Profile_Picture.svg.png?20221210150350"
                    className="shadow-xl rounded-full h-40 align-middle border-none   max-w-150-px"
                  />
                </div>
              </div>
              <div className="w-full px-4 text-center ">
                <div className="flex justify-center py-4 lg:pt-4 pt-8">
                  <div className="mr-4 p-3 text-center">
                    <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                      22
                    </span>
                    <span className="text-sm text-blueGray-400">Friends</span>
                  </div>
                  <div className="mr-4 p-3 text-center">
                    <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                      10
                    </span>
                    <span className="text-sm text-blueGray-400">Photos</span>
                  </div>
                  <div className="lg:mr-4 p-3 text-center">
                    <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                      89
                    </span>
                    <span className="text-sm text-blueGray-400">Comments</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center mt-12">
              <div className="text-xl leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                Name : {userData?.name}
              </div>
              <div className="text-xl leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                E-mail : {userData?.email}
              </div>
              <div className="text-xl leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                Mobile : {userData?.mobile}
              </div>
              <div className="mb-2 text-blueGray-600 mt-10">
                Mern Stack Developer
              </div>
              <div className="mb-2 text-blueGray-600">
                University of Computer Science
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;
