const express = require("express");
const data = require("../data/index");
const { handleSQLError } = require("../sql/error");

// Get all People
const listUsers = (req, res) => {
  try {
    return res.json(data);
  } catch (e) {
    return handleSQLError(res, req);
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
    return handleSQLError(res, req);
  }
};

// Create ONE person
const createUser = (req, res) => {
  const length = data.length;
  //   console.log(req.body);
  try {
    const newPerson = {
      id: length + 1,
      ...req.body,
    };
    // console.log(newPerson);
    data.push(newPerson);
    res.json(newPerson);
  } catch (e) {
    return handleSQLError(res, req);
  }
};

const updateUser = (req, res) => {
  const id = req.params.id;
  console.log(id);

  try {
    const person = data.find((person) => person.id === +id);
    const foundIndex = data.findIndex((person) => person.id === +id);

    const newPerson = {
      ...person,
      ...req.body,
    };
    if (person === undefined) {
      res
        .status(500)
        .send(`Uh oh, we couldn't find a specific item with id ${id}`);
      return;
    }
    data.splice(foundIndex, 1, newPerson);
    res.json(newPerson);
  } catch (e) {
    return handleSQLError(res, req);
  }
};

const deleteUser = (req, res) => {
  const id = req.params.id;
  try {
    const foundIndex = data.findIndex((person) => person.id === +id);
    if (foundIndex === -1) {
      res
        .status(500)
        .send(`Uh oh, we couldn't find a specific item with id ${id}`);
      return;
    }
    data.splice(foundIndex, 1);
    res.json({ message: `Deleted user id: ${id}` });
  } catch (e) {
    return handleSQLError(res, req);
  }
};

module.exports = { listUsers, showUser, createUser, updateUser, deleteUser };
