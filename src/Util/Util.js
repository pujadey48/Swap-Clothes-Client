export const getUrl = (endpoint) => {
    // https://assignment-11-server-pujadey48.vercel.app
    return `http://localhost:5000${endpoint}`;
    // return `https://assignment-11-server-pujadey48.vercel.app${endpoint}`;
    
} 

export const timestampToDate= (UNIX_timestamp) => {
    var a = new Date(UNIX_timestamp);
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time =
      date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
    return time;
  }