Observations = new Meteor.Collection('observations')

if (Meteor.isClient) {
    Template.results.observations = function() {
        return Observations.find({})
    }
}

if (Meteor.isServer) {
    Meteor.startup(function() {

    })
}
