const loginAuth = async () => {
  try {
    let res = await fetch("/api/loginAuth", {
      method: "Get",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    });
    let data = await res.json();
    console.log("rrreees", res);

    if (res.ok) {
      nav("/");
    }
    console.log("login response: ", data);
  } catch (e) {
    console.log(e);
  }
};
