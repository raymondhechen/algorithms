const fetch = require('node-fetch');

async function fetchData() {
    return await fetch(
        'https://candidate.hubteam.com/candidateTest/v3/problem/dataset?userKey=068e1726c64e9e695fb3ee53dd0f'
    ).then((response) => response.json());
}

async function main() {
    // GET data
    const data = await fetchData();

    // Store each partner by country
    var groupedData = {};
    // Store each country's earliest and latest availabilities among all partners
    var startEndDates = {};

    // Group all partners by country first
    data.partners.map((partner) => {
        // if country not in obj
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
            new Date(partner.availableDates[partner.availableDates.length - 1]) > 
            startEndDates[partner.country + '-last']
        ) {
            startEndDates[partner.country + '-last'] = new Date(
                partner.availableDates[partner.availableDates.length - 1]
            );
        }
    });

    // initialize final solution
    var solution = { countries: [] };

    // iterate over each country saved in grouped data
    for (const country in groupedData) {
        // initialize single country's solution
        let countrySolution = {
            attendeeCount: 0,
            attendees: [],
            name: country,
            startDate: null,
        };

        // generate all possible timeframe slots from country's earliest to latest availability
        let slots = {};
        // iterate over all possible consecutive combinations within timeframe
        for (let i = startEndDates[country + '-start']; i < startEndDates[country + '-last']; i.setDate(i.getDate() + 1)) {
            slots[i] = [];
        }

        // iterate over all partners in the country
        groupedData[country].map((partner) => {
            // iterate over a partner's available times
            for (let j = 0; j < partner.availableDates.length - 1; j++) {
                let comparison = new Date(partner.availableDates[j]);
                comparison.setDate(comparison.getDate() + 1);
                // if partner has two consecutive available days
                if (comparison.getTime() === (new Date(partner.availableDates[j+1])).getTime()) {
                    slots[new Date(partner.availableDates[j])].push(partner.email);
                }
            }
        });

        // find time slot with max number of available partners
        let solutionDateKey = Object.keys(slots)[0];
        let solutionDate = slots[solutionDateKey];
        for (const key in slots) {
            if (slots[key].length > solutionDate.length) {
                solutionDate = slots[key];
                solutionDateKey = key;
            }
        }

        // assign solution for country
        countrySolution.attendeeCount = solutionDate.length;
        countrySolution.attendees = solutionDate;
        // construct proper date format
        solutionDateKey = new Date(solutionDateKey);
        var mm = solutionDateKey.getMonth() + 1;
        var dd = solutionDateKey.getDate() + 1;
        mm = (mm > 9 ? '' : '0') + mm;
        dd = (dd > 9 ? '' : '0') + dd;
        countrySolution.startDate = solutionDateKey.getFullYear() + '-' + mm + '-' + dd;
        if (countrySolution.attendeeCount === 0) {
            countrySolution.startDate = null;
        }
        
        // push country's solution to final solution array
        solution.countries.push(countrySolution);
    }

    // POST solution
    const postResponse = await fetch(
        'https://candidate.hubteam.com/candidateTest/v3/problem/result?userKey=068e1726c64e9e695fb3ee53dd0f',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(solution),
        }
    );
    console.log(postResponse);
}

main();
