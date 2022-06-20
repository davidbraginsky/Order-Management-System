# Order Management System

This is my attempt to create an order / inventory management system to be used in HoReCa. The application is designed to be used by three categories of users: front staff (who sends the orders), back staff (who fullfill the orders) and management.

### Table of Contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My Process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Usefull resources](#usefull-resources)
  - [Bugs](#bugs)
- [Author](#author)

## Overview

### The Challenge

Font staff should be able to:

- todo

Back staff should be able to:

- todo

Managers should be able to:

- todo

### Screenshot

### Links

## My Process

### Built with

- React
- Material React 2 Dashboard

### What I learned

### Usefull resources

### Todo

- orders can be filtered by

  - bar ++
  - date
  - completed status

- users can log in to their respective accounts
- loaders see only orders for their respective floor (by default)
- only admin can go into admin panel

### Bugs

- when additional rows are added to order form and only then begun to be fullfilled order form crashes
- make animation when order was succesfull
- make checks that order is completed before sending to DB
- make styles for responsive
- add loader while data is fetched

### Users

- bar2@tsum.ru / bar2tsum
- bar4@tsum.ru / bar4tsum
- loader2@tsum.ru / loader2tsum
- loader4@tsum.ru / loader4tsum
- admin@tsum.ru / admin123tsum

## Author

[@davidbraginsky](https://github.com/davidbraginsky)

                  `{/* <DataTable
                    table={{
                      columns: [
                        { Header: "client", accessor: "client", width: "25%" },
                        { Header: "date", accessor: "date", width: "30%" },
                        { Header: "status", accessor: "status" },
                      ],
                      rows: testMap,
                    }}
                  /> */}

                    // const testMap = orders.map((item) => {// const obj = { client: item.client.title, date: item.date };
// if (item.isCompleted) {
// obj.status = "готов";
// } else {
// obj.status = "в работе";
// }
// return obj;
// });`
