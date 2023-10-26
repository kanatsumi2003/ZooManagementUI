import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewLog = () => {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [animalData, setAnimalData] = useState([]);
  const [mealData, setMealData] = useState([]);

  useEffect(() => {
    const apiUrl = "https://zouzoumanagement.xyz/api/v3/cage/dc@gmail.com";

    axios.get(apiUrl)
      .then((response) => {
        const apiData = response.data;
        setData(apiData);
      })
      .catch((error) => {
        console.error("Lỗi khi gửi yêu cầu GET đến API", error);
      });
  }, []);

  const handleViewDetail = (item) => {
    setSelectedItem(item);
    setAnimalData([]);
    setMealData([]);
  };

  const handleViewAnimalsInCage = (cageId) => {
    const apiAnimalsUrl = `https://zouzoumanagement.xyz/api/v4/animal/${cageId}`;

    axios.get(apiAnimalsUrl)
      .then((response) => {
        const animalData = response.data;
        setAnimalData(animalData);
      })
      .catch((error) => {
        console.error("Lỗi khi gửi yêu cầu GET đến API Animal", error);
      });
  };

  const handleViewMeal = (cageId) => {
    const apiMealUrl = `https://zouzoumanagement.xyz/api/v1/food/daily-meal/${cageId}`;

    axios.get(apiMealUrl)
      .then((response) => {
        const mealData = response.data;
        setMealData(mealData);
      })
      .catch((error) => {
        console.error("Lỗi khi gửi yêu cầu GET đến API Meal", error);
      });
  };

  return (
    <div>
      <h1>View Cage</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>
                <button onClick={() => handleViewDetail(item)}>Xem chi tiết</button>
                <button onClick={() => handleViewAnimalsInCage(item.id)}>View Animal in cage</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedItem && (
        <div>
          <h2>Chi tiết</h2>
          <p>ID: {selectedItem.id}</p>
          <p>Name: {selectedItem.name}</p>
          <p>Quantity: {selectedItem.quantity}</p>
          <p>Cage Status: {selectedItem.cageStatus}</p>
          <p>Cage Type: {selectedItem.cageType}</p>
          <p>Area Name: {selectedItem.areaName}</p>
          <p>Staff Email: {selectedItem.staffEmail}</p>
        </div>
      )}

      {animalData.length > 0 && (
        <div>
          <h2>Animal Details</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>DOB</th>
                <th>DEZ</th>
                <th>Gender</th>
                <th>Specie</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {animalData.map((animal) => (
                <tr key={animal.id}>
                  <td>{animal.id}</td>
                  <td>{animal.name}</td>
                  <td>{animal.dob}</td>
                  <td>{animal.dez}</td>
                  <td>{animal.gender}</td>
                  <td>{animal.specie}</td>
                  <td>{animal.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ViewLog;
