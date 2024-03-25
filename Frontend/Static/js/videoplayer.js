
        function getParameterByName(name, url) {
            if (!url) url = window.location.href;
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        }

        // Get the YouTube link from the query parameter
        const youtubeLink = getParameterByName('youtubeLink');

        // Extract the video ID from the YouTube link
        function extractVideoId(link) {
            const url = new URL(link);
            const searchParams = new URLSearchParams(url.search);
            return searchParams.get('v');
        }

        // Display the video player or handle the link as needed
        if (youtubeLink) {
            const videoId = extractVideoId(youtubeLink);
            if (videoId) {
                // Set the src attribute of the iframe
                document.getElementById('youtubePlayer').src = `https://www.youtube.com/embed/${videoId}`;
            } else {
                console.error('Invalid YouTube link.');
            }
        } else {
            console.error('No YouTube link provided.');
        }
        function playNextVideo() {
            // Add logic to play the next video
            alert('Next video functionality will be implemented here.');
        }