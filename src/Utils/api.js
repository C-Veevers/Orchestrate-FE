import axios from "axios";

const orchestrateApi = axios.create({
  baseURL: "http://orchestrate-co.herokuapp.com/",
});

export const getSingleUser = (id = false) => {
  if (id === false) {
    console.log("no ID");
  } else {
    return orchestrateApi
      .get(`api/users/${id}`)
      .then((res) => {
        return res.data.user;
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

export const setUserEvent = (dates, id = false, title) => {
  if (id === false) {
    console.log("no ID");
  } else {
    return orchestrateApi
      .post(`api/users/${id}/events`, {
        title,
        from: dates.from,
        to: dates.to,
      })
      .then((res) => {
        return res.data.event;
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
export const getSingleGroup = (id = false) => {
  if (id === false) {
    console.log("no ID");
  } else {
    return orchestrateApi
      .get(`api/groups/${id}`)
      .then((res) => {
        return res.data.group;
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

export const getGroupOwner = (id = false) => {
  if (id === false) {
    console.log("no ID");
  } else {
    return orchestrateApi
      .get(`api/groups/${id}/owner`)
      .then((res) => {
        return res.data.owner;
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

export const getSingleGroupMembers = (id = false) => {
  if (id === false) {
    console.log("no ID");
  } else {
    return orchestrateApi
      .get(`api/groups/${id}/members`)
      .then((res) => {
        return res.data.members;
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

export const getAllGroups = () => {
  return orchestrateApi
    .get("api/groups")
    .then((res) => {
      return res.data.groups;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getAllVenues = () => {
  return orchestrateApi
    .get("api/venues")
    .then((res) => {
      return res.data.venues;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getUserGroups = (id = false) => {
  if (id === false) {
    console.log("no ID");
  } else {
    return orchestrateApi
      .get(`api/users/${id}/groups`)
      .then((res) => {
        return res.data.groups;
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

export const getUserVenues = (id = false) => {
  if (id === false) {
    console.log("no ID");
  } else {
    return orchestrateApi
      .get(`api/users/${id}/venues`)
      .then((res) => {
        return res.data.venues;
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

export const getVenueById = (id = false) => {
  if (id === false) {
    console.log("no ID");
  } else {
    return orchestrateApi
      .get(`api/venues/${id}`)
      .then((res) => {
        return res.data.venue;
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

export const login = (username, password) => {
  return orchestrateApi
    .post("login", { username, password })
    .then((res) => {
      return res.data.msg;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getUserByUsername = (name) => {
  return orchestrateApi
    .get(`api/users/search?username=${name}`)
    .then((res) => {
      return res.data.users[0];
    })
    .catch((err) => {
      console.log(err);
    });
};

export const postNewUser = (user) => {
  return orchestrateApi
    .post("api/users", {
      name: {
        first: user.firstname,
        last: user.lastname,
      },
      location: {
        postcode: "m1 09s",
        city: "Manchester",
        country: "England",
      },
      avatar_url: `https://avatars.dicebear.com/api/adventurer/${user.username}.svg`,
      username: user.username,
      email: "steve@gmail.com",
      instruments: ["Harp"],
      password: user.password,
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getUserEvents = (id = false) => {
  if (id === false) {
    console.log("no ID");
  } else {
    return orchestrateApi
      .get(`api/users/${id}/events`)
      .then((res) => {
        return res.data.events;
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

export const removeEvent = (id, uId = false) => {
  if (uId === false) {
    console.log("no ID");
  } else {
    return orchestrateApi
      .delete(`api/users/${uId}/events/${id}`)
      .then((res) => {
        if (res.status === 204) {
          console.log("deleted");
          return true;
        } else {
          console.log("issue:", res.status);
          return false;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

export const postGroup = (group) => {
  return orchestrateApi.post(`api/groups`, group).then((res) => {
    return res.data.group;
  });
};

export const postVenue = (venue) => {
  return orchestrateApi.post(`api/venues`, venue).then((res) => {
    return res.data.venue;
  });
};
