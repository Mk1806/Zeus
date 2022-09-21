var vue = new Vue({
    el: "#wrapper",
    data: {
        quotes: null,
        randomQuoteIndex: null,
        colorOptions: ['#ffb3ba', '#ffdfba', '#bae1ff', '#C23B23', '#F39A27', '#EADA52', '#03C03C', '#579ABE', '#976ED7', '#5FD4A2', '#808080'],
        activeColor: '#ffb3ba',
    },
    created: function() {
        this.fetchData();
    },
    computed: {
        quote: function() {
            let quote = this.quotes[this.randomQuoteIndex];
            return {
                text: quote.quote,
                author: quote.author
            };
        }
    },
    watch: {
        activeColor: function() {
            document.body.style.backgroundColor = this.activeColor;
        }
    },
    methods: {
        fetchData: function() {
            fetch("https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json")
            .then(response => response.json())
            .then(data => {
                this.quotes = data.quotes;
                this.randomize();
            });
        },
        randomize: function() {
            this.randomQuoteIndex = Math.floor(Math.random()*this.quotes.length);
            this.activeColor = this.colorOptions[Math.floor(Math.random()*this.colorOptions.length)];
        }
    }
});

Vue.component('tweet-button', {
    props: ['tweetMessage'],
    methods: {
        tweet: function() {
            window.open("https://twitter.com/intent/tweet?text="+encodeURIComponent(this.tweetMessage), "_blank", );
        }
    },
    template:
        `
        <button v-on:click= "this.tweet" class="twitter-share-button">
        <slot name="icon"></slot>
        </button>
        `
})

Vue.component('tumblr-button', {
    props: ['caption', 'content'],
    methods: {
        share: function() {
            window.open("https://www.tumblr.com/widgets/share/tool?posttype=quote" + "&caption="+encodeURIComponent(this.caption)
            + "&content="+ encodeURIComponent(this.content) + '&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button', "_blank", );
        }
    },
    template:
        `
        <button v-on:click= "this.share" class="tumblr-share-button">
        <slot name="icon"></slot>
        </button>
        `
})