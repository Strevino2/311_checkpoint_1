const express = require("express");
const data = require("../data/index");
const { handleSQLError } = require("../sql/error");

// Get all People
const listUsers = (req, res) => {
  try {
    return res.json(data);
  } catch (e) {
    return handleSQLError(res, req);
    // res.status(500).send("Uh oh, we couldn't find any data");
  }
};

// Get one Person
const showUser = (req, res) => {
  const id = req.params.id;
  try {
    const foundId = data.find((item, index, arr) => item.id === +id);
    if (foundId === undefined) {
      res
        .status(500)
        .send(`Uh oh, we couldn't find a specific item with id ${id}`);
    }
    res.json(foundId);
  } catch (e) {
    // res.status(500).send("Uh oh, we couldn't find any data");
    return handleSQLError(req, res);
  }
};

// Create ONE person
const createUser = (req, res) => {
  const length = data.length;
  console.log(req.body);
  const newPerson = {
    id: length + 1,
    ...req.body,
  };
  // console.log(newPerson);
  data.push(newPerson);
  //   if(err) return handleSQLError(res, err);
  res.json(data);
};

const updateUser = (req, res) => {
  const id = req.params.id;
  console.log(id);
  const person = data.find((person) => person.id === +id);
  const foundIndex = data.findIndex((person) => person.id === +id);

  const newPerson = {
    ...person,
    ...req.body,
  };

  data.splice(foundIndex, 1, newPerson);
  //   if(err) return handleSQLError(res, err);
  res.json(newPerson);
};

const deleteUser = (req, res) => {
  const id = req.params.id;
  const foundIndex = data.findIndex((person) => person.id === +id);

  data.splice(foundIndex, 1);

  res.json({ message: `Deleted user id: ${id}` });
};

module.exports = { listUsers, showUser, createUser, updateUser, deleteUser };
