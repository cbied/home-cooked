# Home Cooked

The app serves as a platform connecting individuals eager to learn authentic cooking (guests) with skilled cooks offering lessons or dining experiences (hosts). Guests have the option to participate in cooking lessons or simply enjoy a meal at the host's home. Users can create profiles as either guests or hosts, with hosts able to post dinner or cooking lesson listings, specify cuisine, dates, and guest capacity. Features such as messaging between hosts and guests, profile management, and secure payment integration further enhance the app's functionality, facilitating seamless interactions and transactions while fostering cultural exchange and culinary education.

## MVP

The app should allow the user to:

Create a user (guest and host)

hosts will have all of the guest features below plus:

able to post a dinner/cooking lesson, cuisine, date, and how many guests they can accommodate

possibly use host information and ChatGPT to write them an about me

Log user in

Read user their information (i.e. user Info)

Update user information (i.e. user Info)

Allow user to search for people hosting dinners based on cuisine, date, and how many guests

Allow Hosts and Guest to message each other

Allow host to connect a bank account to get paid

Allow all users to add/save their credit/debit card information

Allow user to delete their user profile

### `Change Log`

03/25/2024 - addLocationLookup -- IN PROGRESS

add location-finder component, update css, update Google map when finder is used, the lat and lng gets updated in Redux, radius circle to only show markers where user is looking
added more markers in the Asheville area, updated the CSS for the experience finder,

03/26/2024 - addLocationLookup -- IN PROGRESS

convert location-finder to functional component, persist the location address in the bar until updated, update experience-finder-slice to set formattedAddress

03/27/2024 - addLocationLookup -- Done

add location-finder to drawer-experience-finder. update css for smaller screens. Update README to reflect changes

03/29/2024 - bugLocationFinderinDrawers - Done

fix location finder now updating when used in other locations, fixed host list not updating when location finder is used in drawer

04/06/2024 - updateMarkersBasedOnLocation - Done

markers get updated based on where the user click and drags the map. The markers are shown based on the radius of the regionCircle. Also fixed a bug, when the user accepts to share location, the autofil address bar gets updated accordingly
\*\* There is a know bug that still needs to be fixed, when the user clicks and drags the map. Some of the markers do now show up as they are supposed to. I think what is happening, is that the markers and getting duplicated and only a few show up
