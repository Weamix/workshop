# Algolia quick start

**Prerequisites**

- An Algolia account. If you don't have one already, [create an account for free](https://www.algolia.com/users/sign_up).
- Node & [npx](https://www.npmjs.com/package/npx)

## 0. Demo workshop
![algolia demo workshop](my-app/algolia-demo.png)

## 1. Create your first Algolia Index

Algolia will search through any set of data, as long as it’s structured. This is what we call an `index`.
The items are broken down into individual records (`objects`), with each object containing a set of fields (`attributes`).

Exemple of a single `object`, representing an e-commerce product:
```json
{
    "objectID": 1,
    "name": "Samsung Galaxy",
    "description": "Samsung Galaxy Express 3 4G LTE with 8GB Memory Prepaid Cell Phone",
    "brand": "AT&T GoPhone",
    "categories": [
        "Cell Phones"
    ],
    "price": 49.99,
    "image": "https://cdn-demo.algolia.com/bestbuy-0118/4984700_sb.jpg",
    "popularity": 21449
}
```

As you can see, this is just like plain, old JSON :)

### Create your index

**Upload your data**

You will now create a new `index` from [this dataset](./datasets/ecommerce.json).
There are two main ways you can achieve this:

- On the [Algolia Dashboard](https://www.algolia.com/dashboard) by just uploading your JSON file
- By using on the [Algolia API Clients](https://www.algolia.com/doc/guides/getting-started/how-algolia-works/in-depth/ecosystem/#using-the-api-clients)

([Algolia Documentation](https://www.algolia.com/doc/guides/sending-and-managing-data/send-and-update-your-data/#pushing-your-data-to-an-algolia-index))

You can follow [this tutorial](https://www.algolia.com/doc/guides/sending-and-managing-data/send-and-update-your-data/how-to/importing-with-the-api/?client=javascript) to upload the records contained in the file to an Algolia index.

**Configure your index**

An index configuration is a set of settings that define how your index will behave.

1. Ranking: [The 8 Ranking Criteria](https://www.algolia.com/doc/guides/managing-results/relevance-overview/in-depth/ranking-criteria/)

2. Relevance: [Defining Relevance](https://www.algolia.com/doc/guides/managing-results/relevance-overview/in-depth/defining-relevance/)

1. Faceting: [Faceting](https://www.algolia.com/doc/guides/managing-results/refine-results/faceting/) and [How to Declare Attributes for Faceting](https://www.algolia.com/doc/guides/managing-results/refine-results/faceting/how-to/declaring-attributes-for-faceting/#using-the-dashboard)

The goal for this workshop is to configure our index with:
- One custom ranking criteria (`popularity`): https://www.algolia.com/doc/guides/managing-results/must-do/custom-ranking/how-to/configure-custom-ranking/#using-the-dashboard
- Two `attributesForFaceting` (`brand` and `categories`): https://www.algolia.com/doc/guides/managing-results/refine-results/faceting/how-to/declaring-attributes-for-faceting/#using-the-dashboard

Feels free to play around and explore your newly created index from the Algolia Dashboard when you are done!

**Links**
- [What Is Algolia?](https://www.algolia.com/doc/guides/getting-started/what-is-algolia/)
- [How Algolia Works](https://www.algolia.com/doc/guides/getting-started/how-algolia-works/)
- [Quick Start](https://www.algolia.com/doc/guides/getting-started/quick-start/)
- [Sending data to Algolia](https://www.algolia.com/doc/guides/sending-and-managing-data/prepare-your-data/#sending-data-to-algolia)

## 2. Create your frontend application

**Prerequisites**

- [Your Application ID](https://www.algolia.com/doc/guides/sending-and-managing-data/send-and-update-your-data/how-to/importing-with-the-api/#application-id)
- Your Index Name
- [Your Search API Key](https://www.algolia.com/doc/guides/security/api-keys/)

You can find all of the above in the [Algolia Dashboard](https://www.algolia.com/dashboard).

If you didn't complete the previous step you can use the following:
- Application ID: `N66N7FOPGI`
- Search API Key: `41bc8ab6cb33007df5f2e3e41796cfa9`
- Index Name: `demo_ecommerce`

**InstantSearch**

InstantSearch is an open-source, production-ready UI library that lets you quickly build a search interface in your front-end application. It's available in multiple flavors: Vanilla, React, Vue, Angular, iOS and Android.

For this workshop, we will use the create-instantsearch-app CLI (inspired by `create-react-app`).

The CLI will help you quickly create a new React InstantSearch, it will ask you multiple questions, notably your **Application ID**, your **Search API Key** and your **Index Name**.

```
npx create-instantsearch-app my-app
```

**IMPORTANT: Select "React InstantSearch"  when asked for the tenplate to use.**

When the CLI is done bootstrapping your InstantSearch app, you can start it to check that everything is okay:

```
cd my-app
npm start
```

Everything is running smoothly?

To go further, you can:
- Display the images of the records.
- Add another [InstantSearch widget](https://www.algolia.com/doc/guides/building-search-ui/widgets/showcase/react/).

**Links**
- [What Is React InstantSearch?](https://www.algolia.com/doc/guides/building-search-ui/what-is-instantsearch/react/)
- [Widgets Showcase](https://www.algolia.com/doc/guides/building-search-ui/widgets/showcase/react/)
- [API Keys/security](https://www.algolia.com/doc/guides/building-search-ui/going-further/api-keys-security/react/)
- [Demos](https://www.algolia.com/doc/guides/building-search-ui/resources/demos/react/)

## 3. Collect user's activity data (Analytics)

**Prerequisites**

- Configured Index
- React InstantSearch application

Collecting user's activity data is the prerequisites for many of Algolia powerful features like [Recommend](https://www.algolia.com/doc/ui-libraries/recommend/introduction/what-is-recommend/), [AI Re-Ranking](https://www.algolia.com/doc/guides/algolia-ai/re-ranking/), [personalization](https://www.algolia.com/doc/guides/personalization/what-is-personalization/) and [A/B testing](https://www.algolia.com/doc/guides/ab-testing/what-is-ab-testing/)

We will implement the `clickedObjectIDsAfterSearch` event in our React InstantSearch application.

**1. Adding the [Algolia Insights library]() to your application.**

Import the library:

[index.html](./my-app/public/index.html)
```html
<script>
  var ALGOLIA_INSIGHTS_SRC = "https://cdn.jsdelivr.net/npm/search-insights@2.0.3";

  !function(e,a,t,n,s,i,c){e.AlgoliaAnalyticsObject=s,e[s]=e[s]||function(){
  (e[s].queue=e[s].queue||[]).push(arguments)},i=a.createElement(t),c=a.getElementsByTagName(t)[0],
  i.async=1,i.src=n,c.parentNode.insertBefore(i,c)
  }(window,document,"script",ALGOLIA_INSIGHTS_SRC,"aa");
</script>
```

Initialize the Algolia Insights client:

[App.js](./my-app/src/App.js)
```javascript
// Initialize the Insights client.
window.aa('init', {
  appId: 'YOUR_APPLICATION_ID',
  apiKey: 'YOUR_API_KEY',
});

// Set a global userToken
window.aa('setUserToken', 'user-1');
```

Configure your React application to pass the needed context to the insights client:

[App.js](./my-app/src/App.js)
```javascript
<Configure clickAnalytics />
```

**2. Send your first event.**

Now you are all setup to send your first event.
Our goal is to track when one of the item on our search page is being clicked.

First step, "connect" our `Hit` component in order to give him access to the Insights client.

1 - Import the `connectHitInsights`

[App.js](./my-app/src/App.js)
```javascript
import { connectHitInsights } from 'react-instantsearch-dom';
```

2 - "Connect" the `Hit` component (injecting the Insights client)

[App.js](./my-app/src/App.js)
```javascript
const HitWithInsights = connectHitInsights(window.aa)(Hit);
```

3 - Replace the `Hit` component by the `HitWithInsights` one

[App.js](./my-app/src/App.js)
```javascript
<Hits hitComponent={HitWithInsights} />
```

Second step, we need to pass the `objectID` of the clicked item to the Insights client.

```javascript
onClick={() =>
    insights('clickedObjectIDsAfterSearch', {
        eventName: 'Product Clicked'
    })
}
```


You can check and debug your event sending on the [Events hub](https://www.algolia.com/doc/guides/sending-events/validating/#events-hub) in your Algolia Dashboard.

**Links**
- [Getting Started with Events](https://www.algolia.com/doc/guides/sending-events/getting-started/)
- [Improve Results with Analytics](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/improve-relevance-with-analytics/)
- [Click and Conversion Analytics](https://www.algolia.com/doc/guides/getting-analytics/search-analytics/advanced-analytics/)
- [Analytic Metrics and Reports](https://www.algolia.com/doc/guides/getting-analytics/search-analytics/understand-reports/)

## 4. Personalize the search results using Analytics data

As the Personalization feature require a reasonable number of events to be sent, this part will be presented.

- Intro video: https://www.youtube.com/watch?v=ymd7VL233TQ&t=139s
- Dashboard showcase

**Links**
- [What Is Personalization?](https://www.algolia.com/doc/guides/personalization/what-is-personalization/)
- [Personalizing Results](https://www.algolia.com/doc/guides/personalization/personalizing-results/)
- [Configuring Personalization](https://www.algolia.com/doc/guides/personalization/personalizing-results/in-depth/configuring-personalization/)