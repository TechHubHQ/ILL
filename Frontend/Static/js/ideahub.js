

        function submitIdea() {
            var ideaText = document.getElementById('idea').value;
            if (ideaText.trim() !== '') {
                var ideaItem = document.createElement('div');
                ideaItem.className = 'idea-item';
                ideaItem.textContent = 'Idea: ' + ideaText;
                document.querySelector('.idea-feed').appendChild(ideaItem);
                document.getElementById('idea').value = '';
            }
        }
