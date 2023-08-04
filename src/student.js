const fetchStudents = async () => {
  try {
    const token = localStorage.getItem("accesstoken");
    if (!token) {
      console.error("No JWT token found.");
      return;
    }

    const response = await fetch(
      "https://journalapptest.onrender.com/api/getStudents",
      {
        method: "GET",
        mode: "cors",
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    if (!response.ok) {
      console.error("Error fetching students:", response.statusText);
      return;
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching students:", error);
  }
};
// res.push(
//   data.map((student) => ({
//     value: student.username,
//     label: student.username,
//   }))
// );
export { fetchStudents };
