// import React, { useState } from "react";
// import DataTable from "react-data-table-component";

// const Data = () => {

//   const columns = [
//     {
//       name: "Name",
//       selector: (row) => row.name,
//       sortable: true,
//     },
//     {
//       name: "Email",
//       selector: (row) => row.email,
//       sortable: true,
//     },
//     {
//       name: "Age",
//       selector: (row) => row.age,
//       sortable: true,
//     },
//   ];

//   const data = [
//     {
//       id: 1,
//       name: "Shoaib",
//       email: "shoaib.123@gmail.com",
//       age: "23",
//     },
//     {
//       id: 2,
//       name: "Akhtar",
//       email: "Akhtar.123@gmail.com",
//       age: "24",
//     },
//     {
//       id: 3,
//       name: "Haider",
//       email: "Haider.123@gmail.com",
//       age: "22",
//     },
//     {
//       id: 4,
//       name: "Salman",
//       email: "Salman.123@gmail.com",
//       age: "23",
//     },
//     {
//       id: 5,
//       name: "Saabir",
//       email: "Saabir.123@gmail.com",
//       age: "26",
//     },
//     {
//       id: 6,
//       name: "Abdul",
//       email: "Abdul.123@gmail.com",
//       age: "22",
//     },
//     {
//       id: 7,
//       name: "Sameer",
//       email: "Sameer.123@gmail.com",
//       age: "27",
//     },

//     {
//       id: 8,
//       name: "Asif",
//       email: "Asif.123@gmail.com",
//       age: "25",
//     },
//     {
//       id: 9,
//       name: "Kashif",
//       email: "Kashif.123@gmail.com",
//       age: "25",
//     },
//     {
//       id: 10,
//       name: "Shafii",
//       email: "Shafii.123@gmail.com",
//       age: "25",
//     },
//     {
//       id: 11,
//       name: "Shafii iqbal",
//       email: "Shafiiiqbal.123@gmail.com",
//       age: "24",
//     },
//     {
//       id: 11,
//       name: "Shafii iqbal",
//       email: "Shafiiiqbal.123@gmail.com",
//       age: "24",
//     },
//     {
//       id: 12,
//       name: "Shafii iqbal",
//       email: "Shafiiiqbal.123@gmail.com",
//       age: "24",
//     },
//     {
//       id: 13,
//       name: "Jamshed",
//       email: "Jamshed.123@gmail.com",
//       age: "24",
//     },
//     {
//         id: 14,
//         name: "Jamshed",
//         email: "Jamshed.123@gmail.com",
//         age: "24",
//       },
//       {
//         id: 15,
//         name: "jamshed",
//         email: "Jamshed.123@gmail.com",
//         age: "24",
//       },
//   ];
//   const [val, setval] = useState(data)

//   const handleChange = (event) => {
//     const result = data.filter(row => {
//         return row.name.toLowerCase().includes(event.target.value.toLowerCase())
//     })
// setval(result)
//      }
//   return (
//     <div>
//       <div className="container mt-5">
//         <input type="text" className="input" onChange={handleChange}/>
//         <DataTable
//           columns={columns}
//           data={val}
//           fixedHeader
//           selectableRows

//         />
//       </div>
//     </div>
//   );
// };

// export default Data;

import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

const Data = () => {
  const [infoCountries, setinfoCountries] = useState([]);
  const [search, setsearch] = useState("");
  const [filterinfoCountries, setfilterinfoCountries] = useState([]);

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Capital",
      selector: (row) => row.capital,
      sortable: true,
    },
    {
      name: "NativeName",
      selector: (row) => row.nativeName,
      sortable: true,
    },
    {
      name: "Flag",
      selector: (row) => <img src={row.flag} width={50} height={50} alt="" />,
      sortable: true,
    },
    {
      name: "Edit",
      cell: (row) => (
        <button className="edit-btn" onClick={() => alert(row.alpha2Code)}>
          Edit
        </button>
      ),
      sortable: true,
    },
  ];

  const Apifetch = async () => {
    const result = await fetch(`https://restcountries.com/v2/all`);
    const responce = await result.json();
    setinfoCountries(responce);
    setfilterinfoCountries(responce);
  };

  useEffect(() => {
    Apifetch();
  }, []);

  useEffect(() => {
    const result = infoCountries.filter((row) => {
      return row.name.match(search);
    });
    setfilterinfoCountries(result);
  }, [search]);

  return (
    <div>
      <div className="container mt-5">
        <DataTable
          columns={columns}
          data={filterinfoCountries}
          fixedHeader
          fixedHeaderScrollHeight="500px"
          selectableRows
          selectableRowsHighlight
          highlightOnHover
          subHeader
          subHeaderComponent={
            <input
              type="text"
              className="input"
              placeholder="search here"
              value={search}
              onChange={(e) => setsearch(e.target.value)}
            />
          }
        />
      </div>
    </div>
  );
};

export default Data;
