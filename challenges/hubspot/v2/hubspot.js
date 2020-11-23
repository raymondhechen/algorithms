const fetch = require('node-fetch');
const { count } = require('console');

async function fetchData() {
    return await fetch(
        'https://candidate.hubteam.com/candidateTest/v3/problem/dataset?userKey=068e1726c64e9e695fb3ee53dd0f'
    ).then((response) => response.json());
}

async function main() {
    const data = await fetchData();
    // const data = {
    //     partners: [
    //         {
    //             firstName: 'Darin',
    //             lastName: 'Daignault',
    //             email: 'ddaignault@hubspotpartners.com',
    //             country: 'United States',
    //             availableDates: ['2017-05-03', '2017-05-06'],
    //         },
    //         {
    //             firstName: 'Crystal',
    //             lastName: 'Brenna',
    //             email: 'cbrenna@hubspotpartners.com',
    //             country: 'Ireland',
    //             availableDates: ['2017-04-27', '2017-04-29', '2017-04-30'],
    //         },
    //         {
    //             firstName: 'Janyce',
    //             lastName: 'Gustison',
    //             email: 'jgustison@hubspotpartners.com',
    //             country: 'Spain',
    //             availableDates: ['2017-04-29', '2017-04-30', '2017-05-01'],
    //         },
    //         {
    //             firstName: 'Tifany',
    //             lastName: 'Mozie',
    //             email: 'tmozie@hubspotpartners.com',
    //             country: 'Spain',
    //             availableDates: [
    //                 '2017-04-28',
    //                 '2017-04-29',
    //                 '2017-05-01',
    //                 '2017-05-04',
    //             ],
    //         },
    //         {
    //             firstName: 'Temple',
    //             lastName: 'Affelt',
    //             email: 'taffelt@hubspotpartners.com',
    //             country: 'Spain',
    //             availableDates: [
    //                 '2017-04-28',
    //                 '2017-04-29',
    //                 '2017-05-02',
    //                 '2017-05-04',
    //             ],
    //         },
    //         {
    //             firstName: 'Robyn',
    //             lastName: 'Yarwood',
    //             email: 'ryarwood@hubspotpartners.com',
    //             country: 'Spain',
    //             availableDates: [
    //                 '2017-04-29',
    //                 '2017-04-30',
    //                 '2017-05-02',
    //                 '2017-05-03',
    //             ],
    //         },
    //         {
    //             firstName: 'Shirlene',
    //             lastName: 'Filipponi',
    //             email: 'sfilipponi@hubspotpartners.com',
    //             country: 'Spain',
    //             availableDates: ['2017-04-30', '2017-05-01'],
    //         },
    //         {
    //             firstName: 'Oliver',
    //             lastName: 'Majica',
    //             email: 'omajica@hubspotpartners.com',
    //             country: 'Spain',
    //             availableDates: [
    //                 '2017-04-28',
    //                 '2017-04-29',
    //                 '2017-05-01',
    //                 '2017-05-03',
    //             ],
    //         },
    //         {
    //             firstName: 'Wilber',
    //             lastName: 'Zartman',
    //             email: 'wzartman@hubspotpartners.com',
    //             country: 'Spain',
    //             availableDates: [
    //                 '2017-04-29',
    //                 '2017-04-30',
    //                 '2017-05-02',
    //                 '2017-05-03',
    //             ],
    //         },
    //         {
    //             firstName: 'Eugena',
    //             lastName: 'Auther',
    //             email: 'eauther@hubspotpartners.com',
    //             country: 'United States',
    //             availableDates: ['2017-05-04', '2017-05-09'],
    //         },
    //     ],
    // };

    // Group all partners by country first
    var groupedData = {};
    // Store each countries earliest and latest availabilities
    var startEndDates = {};
    data.partners.map((partner) => {
        // if new country
        if (!(partner.country in groupedData)) {
            groupedData[partner.country] = [];
            startEndDates[partner.country + '-start'] = new Date(
                partner.availableDates[0]
            );
            startEndDates[partner.country + '-last'] = new Date(
                partner.availableDates[partner.availableDates.length - 1]
            );
        }
        // add partner to country
        groupedData[partner.country].push(partner);

        // if partner first availability earlier than earliest date for country
        if (
            new Date(partner.availableDates[0]) <
            startEndDates[partner.country + '-start']
        ) {
            startEndDates[partner.country + '-start'] = new Date(
                partner.availableDates[0]
            );
        }

        // if partner last availability later than latest date for country
        if (
            new Date(
                partner.availableDates[partner.availableDates.length - 1]
            ) > startEndDates[partner.country + '-last']
        ) {
            startEndDates[partner.country + '-last'] = new Date(
                partner.availableDates[partner.availableDates.length - 1]
            );
        }
    });

    // console.log(groupedData);
    // console.log(startEndDates);

    var solution = { countries: [] };

    for (const country in groupedData) {
        let countrySolution = {
            attendeeCount: 0,
            attendees: [],
            name: country,
            startDate: null,
        };

        // console.log(groupedData[country])
        let slots = {};
        // console.log(startEndDates[country + '-start']);
        // console.log(startEndDates[country + '-last']);
        for (let i = startEndDates[country + '-start']; i < startEndDates[country + '-last']; i.setDate(i.getDate() + 1)) {
            // console.log(i);
            slots[i] = [];
        }
        // console.log(slots);

        groupedData[country].map((partner) => {
            for (let j = 0; j < partner.availableDates.length - 1; j++) {

                let comparison = new Date(partner.availableDates[j]);
                comparison.setDate(comparison.getDate() + 1);
                // console.log((new Date(partner.availableDates[j])).getDate() + 1)
                // let second = 
                // if (country === "Ireland") {
                //     console.log(comparison);
                //     console.log(new Date(partner.availableDates[j+1]))
                // }

                if (comparison.getTime() === (new Date(partner.availableDates[j+1])).getTime()) {
                    // console.log(partner.availableDates[j]);
                    // console.log("TRUE");
                    slots[new Date(partner.availableDates[j])].push(partner.email);
                }
            }
        });

        // console.log(country);
        // console.log(slots);

        let solutionDateKey = Object.keys(slots)[0];
        let solutionDate = slots[solutionDateKey];
        // console.log(solutionDate);
        // Get date with most availabilities
        for (const key in slots) {
            // console.log(slots[key])
            if (slots[key].length > solutionDate.length) {
                solutionDate = slots[key];
                solutionDateKey = key;
            }
        }

        countrySolution.attendeeCount = solutionDate.length;
        countrySolution.attendees = solutionDate;
        // console.log(solutionDateKey);
        solutionDateKey = new Date(solutionDateKey);
        // console.log(solutionDateKey);
        var mm = solutionDateKey.getMonth() + 1;
        var dd = solutionDateKey.getDate() + 1;
        mm = (mm > 9 ? '' : '0') + mm;
        dd = (dd > 9 ? '' : '0') + dd;

        countrySolution.startDate = solutionDateKey.getFullYear() + '-' + mm + '-' + dd;
        if (countrySolution.attendeeCount === 0) {
            countrySolution.startDate = null;
        }

        // console.log(countrySolution);
        
        // console.log(country);
        // create dictionary of time slots from first available time partner availability
        // count number of available users and record in timeslot
        
        solution.countries.push(countrySolution);
        // break;
    }

    // console.log(solution);

    // post solution
    const postResponse = await fetch('https://candidate.hubteam.com/candidateTest/v3/problem/result?userKey=068e1726c64e9e695fb3ee53dd0f', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        // mode: 'cors', // no-cors, *cors, same-origin
        // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        // redirect: 'follow', // manual, *follow, error
        // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(solution) // body data type must match "Content-Type" header
      });
    console.log(postResponse);
}

main();
