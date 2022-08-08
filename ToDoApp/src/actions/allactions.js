//below 3 actions are for tasks

export const addTask = (task) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    //some async function call for database then
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authid = getState().firebase.auth.uid;
    const authmail = getState().firebase.auth.email;
    firestore
      .collection("AllTodos")
      .add({
        ...task,
        authorName: profile.name,
        authorphoneno: profile.phoneno,
        authorMail: authmail,
        authorId: authid,
        createdAt: new Date(),
      })
      .then((resp) => {
        task.id = resp.id;
        dispatch({ type: "ADD_TASK", newtask: task });
      })
      .catch((err) => console.log("error", err));
  };
};

export const editTask = (task) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    //some async function call for database then

    const firestore = getFirestore();
    firestore
      .collection("AllTodos")
      .doc(task.id)
      .update({
        mode: task.mode,
        time: task.time,
        date: task.date,
        list: task.list,
        check: task.check,
        task: task.task,
        createdAt: new Date(),
      })
      .then((resp) => {
        console.log("edit success");
      })
      .catch((err) => console.log("error", err));
  };
};

export const deleteTask = (id) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    //some async function call for database then

    const firestore = getFirestore();
    firestore
      .collection("AllTodos")
      .doc(id)
      .delete()
      .then((resp) => {
        console.log("delete success");
        // dispatch({ type: "DELETE_TASK", id: id });
      })
      .catch((err) => console.log("error", err));
  };
};

//below 3 actions are for lists

export const addList = (newname) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    //some async function call for database then
    const firestore = getFirestore();
    const authid = getState().firebase.auth.uid;

    let newone = getState().firestore.ordered.AllLists.find(
      (post) => post.id === authid
    );
    let newlists = newone.lists.filter((post) => post);

    newlists.pop();
    newlists.push(newname);
    newlists.push("Finished");

    firestore
      .collection("AllLists")
      .doc(authid)
      .update({
        lists: newlists,
      })
      .then(() => {
        console.log("success addlist");
      })
      .catch((err) => {
        console.log("failure addlist", err);
      });
    dispatch({ type: "ADD_LIST", newname: newname });
  };
};

export const editList = (task, newlist) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    //some async function call for database then
    const firestore = getFirestore();
    const authid = getState().firebase.auth.uid;

    let newone = getState().firestore.ordered.AllLists.find(
      (post) => post.id === authid
    );
    let newlists = newone.lists.filter((post) => {
      return post !== task;
    });
    newlists.pop();
    newlists.push(newlist);
    newlists.push("Finished");

    firestore
      .collection("AllLists")
      .doc(authid)
      .update({
        lists: newlists,
      })
      .then(() => {
        console.log("success addlist");
      })
      .catch((err) => {
        console.log("failure addlist", err);
      });

    const updatefunc = (docid) => {
      firestore
        .collection("AllTodos")
        .doc(docid)
        .update({
          list: newlist,
        })
        .then((resp) => {
          console.log("edit success");
          // dispatch({ type: "EDIT_TASK", newtask: task });
        })
        .catch((err) => console.log("error", err));
    };

    firestore
      .collection("AllTodos")
      .where("authorId", "==", authid)
      .where("list", "==", task)
      .get()
      .then((resp) => {
        resp.docs.forEach((doc) => {
          updatefunc(doc.id);
        });
      })
      .catch((err) => {
        console.log("failure editlist", err);
      });
    // dispatch({ type: "EDIT_LIST", list: task, newlist: newlist });
  };
};

export const deleteList = (task) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    //some async function call for database then

    const firestore = getFirestore();
    const authid = getState().firebase.auth.uid;

    let newone = getState().firestore.ordered.AllLists.find(
      (post) => post.id === authid
    );
    let newlists = newone.lists.filter((post) => {
      return post !== task;
    });

    firestore
      .collection("AllLists")
      .doc(authid)
      .update({
        lists: newlists,
      })
      .then(() => {
        console.log("success addlist");
      })
      .catch((err) => {
        console.log("failure addlist", err);
      });

    const updatefunc = (docid) => {
      firestore
        .collection("AllTodos")
        .doc(docid)
        .delete()
        .then((resp) => {
          console.log("delete success");
        })
        .catch((err) => console.log("error", err));
    };

    firestore
      .collection("AllTodos")
      .where("authorId", "==", authid)
      .where("list", "==", task)
      .get()
      .then((resp) => {
        resp.docs.forEach((doc) => {
          updatefunc(doc.id);
        });
      })
      .catch((err) => {
        console.log("failure deletelist", err);
      });

    // dispatch({ type: "DELETE_LIST", list: task });
  };
};

//below 3 actions are for finished tasks

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

export const moveToFinished = (id) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    //some async function call for database then
    const firestore = getFirestore();
    firestore
      .collection("AllTodos")
      .doc(id)
      .update({
        check: true,
      })
      .then((resp) => {
        console.log("moveToFinished success");
        // dispatch({ type: "MOVE_TO_FINISHED", id: id });
      })
      .catch((err) => console.log("error", err));
  };
};

export const notToFinished = (post) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const { id, ...withoutId } = post;
    //some async function call for database then
    let millisec;
    if (post.mode === "Once a Day") {
      millisec = 86400000;
    } else if (post.mode === "Once a Week") {
      millisec = 604800000;
    } else if (post.mode === "Once a Month") {
      millisec = 2592000000;
    } else if (post.mode === "Once a Year") {
      millisec = 31536000000;
    }

    const { strdate, newtime } = timesetter(post.date, post.time, millisec);

    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authid = getState().firebase.auth.uid;
    const authmail = getState().firebase.auth.email;
    firestore
      .collection("AllTodos")
      .add({
        ...withoutId,
        date: strdate,
        time: newtime,
        authorName: profile.name,
        authorphoneno: profile.phoneno,
        authorMail: authmail,
        authorId: authid,
        createdAt: new Date(),
      })
      .then((resp) => {
        console.log("success");
        // dispatch({ type: "NOT_TO_FINISHED", post: post });
      })
      .catch((err) => console.log("error", err));
  };
};

export const reloadTask = (id) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    //some async function call for database then
    const firestore = getFirestore();
    firestore
      .collection("AllTodos")
      .doc(id)
      .update({
        check: false,
      })
      .then((resp) => {
        console.log("reloadtask success");
        // dispatch({ type: "RELOAD_TASK", id: id });
      })
      .catch((err) => console.log("error", err));
  };
};

export const feedbackform = (task) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    //some async function call for database then
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authid = getState().firebase.auth.uid;
    const authmail = getState().firebase.auth.email;
    firestore
      .collection("Feedbacks")
      .doc(authid)
      .set({
        ...task,
        authorName: profile.name,
        authorphoneno: profile.phoneno,
        authorMail: authmail,
        authorId: authid,
        createdAt: new Date(),
      })
      .then(() => {
        console.log("success feedback");
      })
      .catch((err) => console.log("error", err));
  };
};
