import React, { useEffect, useState } from "react";
import { carTypes, vehicles } from "../helper/constants";
import Select from "react-select";
import "./Cars.css";

export const Cars = () => {
  const [selectedType, SetSelectedType] = useState("");
  const [vehiclesData, SetVehiclesData] = useState([]);
  const [selectedVehicle, SetSelectedVehicle] = useState("");

  //lifecycle method called on perticular state change
  useEffect(() => {
    // Filtering vehicles based on category
    let filteredVehicleData = vehicles.filter(
      (vehicleDetails) => vehicleDetails.Type === selectedType.name
    );
    SetSelectedVehicle("");
    // Mapping data for second Dropdown
    if (filteredVehicleData.length > 0) {
      let filreredDropDownCars = [];
      filteredVehicleData.map((vehiclesDetail) => {
        let carData = {};
        carData.name = vehiclesDetail.Name;
        carData.label = vehiclesDetail.Name;
        filreredDropDownCars.push(carData);
      });
      SetVehiclesData(filreredDropDownCars);
    } else {
      SetVehiclesData([]);
    }
  }, [selectedType]);

  //handle car Type change
  const handleChange = (selectedOption) => {
    SetSelectedType(selectedOption);
  };

  //handle vehicle change
  const handleVehicleChange = (selectedOption) => {
    let vehicleDetail = vehicles.find(
      (vehicle) => vehicle.Name === selectedOption.name
    );
    SetSelectedVehicle(vehicleDetail);
  };

  return (
    <>
      <div className="margin-25">
        <div class="card" style={{ width: "18rem" }}>
          <div class="card-body">
            <h5 class="card-title">Vehicle</h5>
            <h6 class="card-subtitle mb-2 text-muted">Vehicle Type</h6>
            <p class="card-text">
              <Select
                options={carTypes}
                value={selectedType}
                onChange={handleChange}
              />
            </p>
            {vehiclesData && vehiclesData.length > 0 && (
              <>
                <h6 class="card-subtitle mb-2 text-muted">
                  Available Vehicles
                </h6>
                <p class="card-text">
                  <Select
                    options={vehiclesData}
                    onChange={handleVehicleChange}
                  />
                </p>
              </>
            )}
          </div>
        </div>

        {selectedVehicle && (
          <>
            <div class="card" style={{ width: "18rem" }}>
              <div class="card-body">
                <h4 class="card-subtitle mb-2 text-muted">Vehicle Details:</h4>

                <p class="card-text">
                  <h6 class="card-subtitle mb-2 text-muted">
                    <strong>Name:</strong>
                    {selectedVehicle.Name}
                  </h6>
                  <h6 class="card-subtitle mb-2 text-muted">
                    <strong> Battery Capacity:</strong>{" "}
                    {selectedVehicle.BatteryCapacity}
                  </h6>
                  <h6 class="card-subtitle mb-2 text-muted">
                    <strong>Distance Per Charge:</strong>{" "}
                    {selectedVehicle.DistancePerCharge}
                  </h6>
                  <h6 class="card-subtitle mb-2 text-muted">
                    <strong>Price:</strong> {selectedVehicle.Price}
                  </h6>
                  <h6 class="card-subtitle mb-2 text-muted">
                    <strong>RechargeTime:</strong>{" "}
                    {selectedVehicle.RechargeTime}
                  </h6>
                  <h6 class="card-subtitle mb-2 text-muted">
                    <strong>Awards:</strong> {selectedVehicle.Awards}
                  </h6>
                  <h6 class="card-subtitle mb-2 text-muted">
                    <strong>Type:</strong> {selectedVehicle.Type}
                  </h6>
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
