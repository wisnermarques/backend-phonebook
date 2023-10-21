const conn = require("../db/conn");

const read = (request, response) => {
  conn("tab_persons")
    .select()
    .then((persons) => {
      response.json(persons);
    });
};

const create = (request, response) => {
  const { nome, numero } = request.body;

  let errors = [];

  if (!nome) {
    errors.push({ error: "Nome não fornecido" });
  }

  if (!numero) {
    errors.push({ error: "Número não fornecido" });
  }

  if (errors.length > 0) {
    return response.status(400).json(errors);
  }

  conn("tab_persons")
    .insert({ nome, numero })
    .then((person) => {
      response.json(person);
    })
    .catch((error) => {
      response.status(500).json({
        error: "Erro ao inserir a tarefa no banco de dados",
      });
    });
};

const update = (request, response) => {
  const { nome, numero } = request.body;
  const id = Number(request.params.id);

  if (!nome) {
    return response.status(400).json({
      error: "Nome da tarefa não fornecido",
    });
  }
  conn("tab_persons")
    .update({ nome, numero })
    .where({ id: id })
    .then((_) => {
      response.status(200).json({ msg: "Tarefa atualizada com sucesso!" });
    })
    .catch((error) => {
      response.status(500).json({
        error: "Erro ao inserir a tarefa no banco de dados",
      });
    });
};

const readById = (request, response) => {
  const id = Number(request.params.id);
  conn("tab_persons")
    .select()
    .where({ id: id })
    .then((person) => {
      response.status(200).json(person);
    })
    .catch((error) => {
      response.status(500).json({
        error: "Erro ao buscar a tarefa no banco de dados!",
      });
    });
};

const del = (request, response) => {
  const id = Number(request.params.id);
  conn("tab_persons")
    .del()
    .where({ id: id })
    .then((_) => {
      response.status(200).json({ msg: "A tarefa foi excluida!" });
    })
    .catch((error) => {
      response.status(500).json({
        error: "Erro ao excluir a tarefa no banco de dados!",
      });
    });
};

module.exports = { read, create, update, readById, del };
