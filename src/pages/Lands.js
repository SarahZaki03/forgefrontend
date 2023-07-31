import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import MediaCard from "../components/MediaCard/Mediacard";
import axios from "axios";

const Lands = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    axios
      // .post("http://192.168.1.34:8070/api/ParcelActivityTypes/GetAllActivities")
      .get("http://localhost:8080/events")
      .then((data) => {
        console.log(data.data.events);
        // setActivities(data?.data);
        setActivities(data.data.events);
      });
  }, []);

  return (
    <div>
      <Header />
      <div className="d-flex flex-column align-items-center my-5 ">
        <div className="container my-5">
          <div className="row d-flex flex-wrap justify-content-center justify-content-lg-between set-gap">
            {activities
              ? activities.map((activity) => (
                  <MediaCard
                    key={activity.id}
                    title={activity.title}
                    imgsrc={activity.image}
                    activityId={activity.id}
                    description={activity.description}
                  />
                  // </div>
                ))
              : "There's No Lands To Be Registered"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lands;
