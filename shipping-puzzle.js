/*
## Problem Description

Yesterday, Greg was very busy packing up some gifts to send out to family and
friends. It was a busy month. He had a birthday, an anniversary, a wedding, and
even a house warming to send gifts out for - and the events all took place in
the same week! Because he moved away from his home area when he took his new
job, he lived across the country from most of his family and friends now. As a
result, he always tried to find something locally for each person to make each
gift more personal and interesting. Determine the full name of each person he
shipped a gift to, what state each lived in, what each event was, each person’s
relationship to Greg, and what day of the week each event was taking place
(Wednesday through Saturday).

1. Greg’s friend wasn’t Ellen Fairview, who didn’t live in Ohio. The birthday girl didn’t have her party on Friday.
2. Rick’s last name wasn’t Bartley but his event was on Saturday night.
3. Greg’s father wasn’t getting married, but his last name was Gray.
4. The friend having a house warming didn’t live in Ohio.
5. The wedding was for Greg’s cousin.  Heather, who didn’t live in Texas, was Greg’s sister but her event wasn’t on Wednesday night.
6. Walter’s event was one day earlier than the person whose last name was DeForest but after the person
   who lived in Washington. The anniversary was held in Montana.
*/

/*
Names:
Rick last name either DeForest or Gray and event on Saturday
Walter last name is Bartley or Gray
Ellen last name is Fairview and not friend
Heather last name Bartley or Deforest

Relation:
Friend has housewarming, not in Ohio, and not Ellen
Father isn't getting married but last name was Gray
Cousin has wedding
Sister is Heather and not in Texas and event not on Wednesday

Possible options:
Heather:
Lastname = Bartley
Event = birthday
Day = Thursday
State = ohio
Relation = sister

Ellen:
Lastname = Fairview
Event = wedding
Day = wednesday
State = washington
Relation = cousin

Rick:
Lastname: Deforest
Event: housewarming
Day: Saturday
State: texas
Relation: Friend

Walter:
Lastname: Gray
Event: anniversary
Day: Friday
State: Montana
Relation: father

*/

function shippingPuzzle(){


    const firstNames = ['Ellen', 'Heather', 'Rick', 'Walter']
    const lastNames = ['Bartley', 'DeForest', 'Fairview', 'Gray']
    const states = ['Ohio', 'Montana', 'Texas', 'Washington']
    const events = ['anniversary', 'birthday', 'house warming', 'wedding']
    const relationships = ['cousin', 'father', 'friend', 'sister']
    const days = ['Wednesday', 'Thursday', 'Friday', 'Saturday']
    const genders = ['He', 'She']

    const allOpt = permutate(firstNames, lastNames, states, events, relationships, days, genders);
    //console.log(allOpt)
    const filtered = allOpt.filter(validOpt)
    //console.log(filtered)
    logPersons(filtered)


}

function permutate(names, lastNames, states, events, relations, days, genders){
    var persons = []
    for (var i = 0; i < names.length; i++) {
        for (var j = 0; j < lastNames.length; j++) {
            for (var k = 0; k < states.length; k++) {
                for (var l = 0; l < days.length; l++) {
                    for (var m = 0; m < relations.length; m++) {
                        for (var n = 0; n < genders.length; n++) {
                            for (var o = 0; o < events.length; o++) {
                                persons.push({
                                name: names[i],
                                lastName: lastNames[j],
                                state: states[k],
                                day: days[l],
                                relation: relations[m],
                                gender: genders[n],
                                events: events[o]
                                })
                            }
                        }
                    }
             
               }
            }
        }
    }
    return persons
}

function validOpt(person){
    //Rule 1
    if (person.relation === 'friend' && person.name === 'Ellen') return false
    if (person.relation === 'friend' && person.lastName === 'Fairview') return false
    if (person.name === 'Ellen' && person.lastName !== 'Fairview') return false
    if (person.name !== 'Ellen' && person.lastName === 'Fairview') return false
    if (person.name === 'Ellen' && person.state === 'Ohio') return false
    if (person.name === 'Ellen' && person.gender !== 'She') return false

    if (person.gender === 'He' && person.events === 'birthday') return false
    if (person.events === 'birthday' && person.day === 'Friday') return false

    //Rule 2
    if (person.name === 'Rick' && person.lastName === 'Bartley') return false
    if (person.name === 'Rick' && person.day !== 'Saturday') return false
    if (person.name !== 'Rick' && person.day === 'Saturday') return false
    if (person.name === 'Rick' && person.gender !== 'He') return false

    //Rule 3
    if (person.relation === 'father' && person.events === 'wedding') return false
    if (person.relation === 'father' && person.lastName !== 'Gray') return false
    if (person.relation !== 'father' && person.lastName === 'Gray') return false
    if (person.relation === 'father' && person.gender !== 'He') return false

    //Rule4
    if (person.relation === 'friend' && person.events !== 'house warming') return false
    if (person.relation !== 'friend' && person.events === 'house warming') return false
    if (person.relation === 'friend' && person.state === 'Ohio') return false

    //Rule 5
    if (person.relation === 'cousin' && person.events !== 'wedding') return false
    if (person.relation !== 'cousin' && person.events === 'wedding') return false

    if (person.relation === 'sister' && person.name !== 'Heather') return false
    if (person.relation !== 'sister' && person.name === 'Heather') return false
    if (person.name === 'Heather' && person.state === 'Texas') return false
    if (person.name === 'Heather' && person.day === 'Wednesday') return false
    if (person.name === 'Heather' && person.gender !== 'She') return false

    //Results of first 5 and backhalf of 6
    //Ellen = cousin
    if (person.name === 'Ellen' && person.relation !== 'cousin') return false
    if (person.name !== 'Ellen' && person.relation === 'cousin') return false

    //Heather = birthday && on thursday
    if (person.name === 'Heather' && person.events !== 'birthday') return false
    if (person.name !== 'Heather' && person.events === 'birthday') return false
    if (person.name !== 'Heather' && person.day === 'Thursday') return false


    //Rule 6 first half
    if (person.name === 'Walter' && person.lastName === 'DeForest') return false
    if (person.name === 'Walter' && person.state === 'Washington') return false
    if (person.lastName === 'DeForest' && person.state === 'Washington') return false
    if (person.name === 'Walter' && person.gender !== 'He') return false


    //Results of 6
    //Walter = fri && Rick = DeForest
    if (person.lastName === 'DeForest' && person.day !== 'Saturday') return false
    if (person.lastName !== 'DeForest' && person.day === 'Saturday') return false
    if (person.lastName === 'DeForest' && person.name !== 'Rick') return false
    if (person.lastName !== 'DeForest' && person.name === 'Rick') return false
    if (person.name === 'Walter' && person.day !== 'Friday') return false
    if (person.name !== 'Walter' && person.day === 'Friday') return false

    //Walter Gray = father && Rick = DeForest
    if (person.relation === 'father' && person.name !== 'Walter') return false
    if (person.relation !== 'father' && person.name === 'Walter') return false

    //Rick != Ohio or Montana or Washington
    if (person.name === 'Rick' && person.state !== 'Texas') return false
    if (person.name !== 'Rick' && person.state === 'Texas') return false

    //Ellen != ohio && tx and montana aren't options
    if (person.state === 'Washington' && person.name !== 'Ellen') return false
    if (person.state !== 'Washington' && person.name === 'Ellen') return false


    //Rule 6 very back
    if (person.events === 'anniversary' && person.state !== 'Montana') return false
    if (person.state === 'Montana' && person.events !== 'anniversary') return false

    return true

}

function logPersons (arr) {
    for (var i = 0; i < arr.length; i++) {
      var str = arr[i].name + ' ' +
      arr[i].lastName + ' lives in ' +
      arr[i].state + ' and is Greg\'s ' +
      arr[i].relation + '. ' + arr[i].gender +
      ' had a ' + arr[i].events + ' on ' + arr[i].day + '.'
      console.log(str)
    }
}

shippingPuzzle()