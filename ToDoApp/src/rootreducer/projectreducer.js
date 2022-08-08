const initstate = {
  all_lists: [
    "Default",
    "Personal",
    "Work",
    "Shopping",
    "WishList",
    "Finished",
  ],
  all_todos: [
    {
      id: "2kgv3hg345v",
      mode: "Once a Day",
      time: "12:00",
      date: "1975/2/12",
      list: "Personal",
      check: false,
      task: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequatur voluptate laborum ",
    },
  ],
};

const projectreducer = (state = initstate, action) => {
  // console.log(action);
  if (action.type === "DELETE_TASK") {
    let newPosts = state.all_todos.filter((post) => {
      return post.id !== action.id;
    });
    return {
      ...state,
      all_todos: newPosts,
    };
  }
  if (action.type === "ADD_TASK") {
    let newPosts = [...state.all_todos, action.newtask];
    return {
      ...state,
      all_todos: newPosts,
    };
  }
  if (action.type === "EDIT_TASK") {
    let newPosts = [...state.all_todos, action.newtask];
    return {
      ...state,
      all_todos: newPosts,
    };
  }
  if (action.type === "ADD_LIST") {
    let newlists = [...state.all_lists, action.newname];
    return {
      ...state,
      all_lists: newlists,
    };
  }
  if (action.type === "DELETE_LIST") {
    let newlists = state.all_lists.filter((post) => {
      return post !== action.list;
    });
    let newPosts = state.all_todos.filter((post) => {
      return post.list !== action.list;
    });
    return {
      ...state,
      all_lists: newlists,
      all_todos: newPosts,
    };
  }
  const timesetter = (date, time, millisec) => {
    let str = new Date(date + " " + time).getTime() + millisec;
    let newdate = new Date(str);
    let newtimehr, newtimemin;
    let strdate =
      newdate.getFullYear() +
      "/" +
      (newdate.getMonth() + 1) +
      "/" +
      newdate.getDate();

    newtimehr = newdate.getHours();
    if (newdate.getHours() < 10) {
      newtimehr = `0${newdate.getHours()}`;
    }
    newtimemin = newdate.getMinutes();

    if (newdate.getMinutes() < 10) {
      newtimemin = `0${newdate.getMinutes()}`;
    }
    let newtime = `${newtimehr}:${newtimemin}`;
    return { strdate, newtime };
  };
  if (action.type === "EDIT_LIST") {
    let newlists = state.all_lists.filter((post) => {
      return post !== action.list;
    });
    newlists.push(action.newlist);
    state.all_todos.forEach((post) => {
      if (post.list === action.list) {
        post.list = action.newlist;
      }
    });
    // console.log(state.all_todos);
    return {
      ...state,
      all_lists: newlists,
    };
  }
  if (action.type === "MOVE_TO_FINISHED") {
    state.all_todos.forEach((post) => {
      if (post.id === action.id) {
        post.check = true;
      }
    });

    return {
      ...state,
    };
  }
  if (action.type === "NOT_TO_FINISHED") {
    let newtasks = [...state.all_todos],
      millisec;
    if (action.post.mode === "Once a Day") {
      millisec = 86400000;
    } else if (action.post.mode === "Once a Week") {
      millisec = 604800000;
    } else if (action.post.mode === "Once a Month") {
      millisec = 2592000000;
    } else if (action.post.mode === "Once a Year") {
      millisec = 31536000000;
    }

    const { strdate, newtime } = timesetter(
      action.post.date,
      action.post.time,
      millisec
    );
    action.post.date = strdate;
    action.post.time = newtime;
    newtasks = [...state.all_todos, action.post];
    return {
      ...state,
      all_todos: newtasks,
    };
  }
  if (action.type === "RELOAD_TASK") {
    state.all_todos.forEach((post) => {
      if (post.id === action.id) {
        post.check = false;
      }
    });
    return {
      ...state,
    };
  }

  return state;
};

export default projectreducer;
