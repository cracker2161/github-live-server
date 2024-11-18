// JSON ফাইল থেকে ডেটা লোড
fetch('channels.json')
    .then(response => response.json())
    .then(data => {
        const main = document.querySelector('main');
        const videoPlayer = document.getElementById('video-player');

        // প্রতিটি ক্যাটাগরি রেন্ডার করুন
        data.categories.forEach(category => {
            const categoryDiv = document.createElement('div');
            categoryDiv.classList.add('category');
            categoryDiv.innerHTML = `<h2>${category.name}</h2>`;

            const channelsDiv = document.createElement('div');
            channelsDiv.classList.add('channels');

            // প্রতিটি চ্যানেল রেন্ডার করুন
            category.channels.forEach(channel => {
                const channelDiv = document.createElement('div');
                channelDiv.classList.add('channel');
                channelDiv.innerHTML = `
                    <img src="${channel.logo}" alt="${channel.name}">
                    <p>${channel.name}</p>
                `;
                // চ্যানেল ক্লিক ইভেন্ট
                channelDiv.addEventListener('click', () => {
                    videoPlayer.src = channel.url; // ভিডিও URL সেট
                    videoPlayer.play(); // প্লে করুন
                });
                channelsDiv.appendChild(channelDiv);
            });

            categoryDiv.appendChild(channelsDiv);
            main.appendChild(categoryDiv);
        });
    })
    .catch(error => console.error('Error loading channels:', error));
