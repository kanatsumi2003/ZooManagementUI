import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CageTable = () => {
  const [cageData, setCageData] = useState([]);
  const [mealData, setMealData] = useState(null);
  const [selectedCage, setSelectedCage] = useState(null);
  const [animalData, setAnimalData] = useState([]);
  const [sickMealData, setSickMealData] = useState(null);
  const [isViewLogVisible, setIsViewLogVisible] = useState(false)
  useEffect(() => {
    const apiUrl = `https://zouzoumanagement.xyz/api/v3/cage/${localStorage.getItem("email")}`;

    axios.get(apiUrl)
      .then((response) => {
        const cageData = response.data;
        setCageData(cageData);
      })
      .catch((error) => {
        console.error("Lỗi khi gửi yêu cầu GET đến API", error);
      });
  }, []);

  const handleViewDetail = (cage) => {
    setSelectedCage(cage);
    setAnimalData([]);
  };

  const handleViewMeal = (cageId) => {
    const mealApiUrl = `https://zouzoumanagement.xyz/api/v1/food/cage/${cageId}`;

    axios.get(mealApiUrl)
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
      <h1>Thông Tin Khu Chuồng</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cageData.map((cage) => (
            <tr key={cage.id}>
              <td>{cage.id}</td>
              <td>{cage.name}</td>

              <td>
  <button onClick={() => handleViewDetail(cage)} class="btn waves-effect waves-light" style={{ marginRight: '10px' }}>
    <i class="material-icons left small">visibility</i>Xem chi tiết
  </button>
  <button onClick={() => handleViewMeal(cage.id)} class="btn waves-effect waves-light">
    <i class="material-icons left small">restaurant_menu</i>View Meal
  </button>
</td>

            </tr>
          ))}
        </tbody>
      </table>
      {selectedCage && (
        <div>
          <h2>Chi tiết</h2>
          <p>ID: {selectedCage.id}</p>
          <p>Name: {selectedCage.name}</p>
          <p>Quantity: {selectedCage.quantity}</p>
          <p>Cage Status: {selectedCage.cageStatus}</p>
          <p>Cage Type: {selectedCage.cageType}</p>
          <p>Area Name: {selectedCage.areaName}</p>
          <p>Staff Email: {selectedCage.staffEmail}</p>
        </div>
      )}

{mealData && (
  <div>
    <h2>Thông Tin Bữa Ăn</h2>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Animal ID</th>
          <th>Food and Weight</th>
        </tr>
      </thead>
      <tbody>
        {mealData.meal ? (
          mealData.meal.map((m) => (
            <tr key={m.id}>
              <td>{m.id ? m.id : 'N/A'}</td>
              <td>{m.name ? m.name : 'N/A'}</td>
              <td>{m.cageId ? m.cageId : 'N/A'}</td>
              <td>
                <ul>
                  {m.haveFood ? (
                    m.haveFood.map((food) => (
                      <li key={food.id}>
                        {food.id ? food.id : 'N/A'} . 
                        Name: {food.name ? food.name : 'N/A'}, <br />
                        Height: {food.weight ? `${food.weight}kg` : 'N/A'}
                      </li>
                    ))
                  ) : (
                    <li>No food data available</li>
                  )}
                </ul>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="3">No meal data available</td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
)}
    </div>
  );
};

export default CageTable;
