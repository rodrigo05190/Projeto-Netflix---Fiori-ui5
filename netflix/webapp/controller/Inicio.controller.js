sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/BusyIndicator"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, BusyIndicator) {
        "use strict";

        return Controller.extend("netflix.controller.Inicio", {
            onInit: async function () {
                var view = this.getView();
                sap.ui.core.BusyIndicator.show();
                var results = {
                    titles: []
                };
                const movieModel = new JSONModel();
                movieModel.setData(results);
                view.setModel(movieModel, "movies");

                const url = `https://netflix54.p.rapidapi.com/search/?query=&offset=0&limit_titles=50&limit_suggestions=20&lang=en`;
                const options = {
                    method: 'GET',
                    headers: {
                        'X-RapidAPI-Key': '0f38882599msh356b2472cf08de0p1fa057jsn21bf8f59717c',
                        'X-RapidAPI-Host': 'netflix54.p.rapidapi.com'
                    }
                };
                try {
                    const response = await fetch(url, options);
                    const result = await response.json();
                    var view = this.getView();
                    var model = view.getModel("movies"); // Use "movies" as the model name

                    if (model) {
                        var data = model.getData();
                        data.titles = result.titles;
                        
                        model.refresh();
                        sap.ui.core.BusyIndicator.hide();
                    } else {
                        console.error("Model 'movies' not found in the view.");
                    }

                } catch (error) {
                    console.error(error);
                }
                
            },
            onPressInit: function () {
                alert('cliquei no inicio');
            },
            onPressSeries: function () {
                alert('cliquei em series');
            },
            onSearch: async function () {
                sap.ui.core.BusyIndicator.show();
                let value = this.byId('inputSearch').getValue();
                const url = `https://netflix54.p.rapidapi.com/search/?query=${value}&offset=0&limit_titles=50&limit_suggestions=20&lang=en`;
                const options = {
                    method: 'GET',
                    headers: {
                        'X-RapidAPI-Key': '0f38882599msh356b2472cf08de0p1fa057jsn21bf8f59717c',
                        'X-RapidAPI-Host': 'netflix54.p.rapidapi.com'
                    }
                };
                try {
                    const response = await fetch(url, options);
                    const result = await response.json();
                    var view = this.getView();
                    var model = view.getModel("movies"); // Use "movies" as the model name

                    if (model) {
                        var data = model.getData();
                        data.titles = result.titles;
                        
                        model.refresh();
                        sap.ui.core.BusyIndicator.hide();
                    } else {
                        console.error("Model 'movies' not found in the view.");
                    }

                } catch (error) {
                    console.error(error);
                }
            },
        });
    });
