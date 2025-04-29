document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.in-page-navigation-links').forEach(link => {
        console.log("links first123")
        link.addEventListener('click', function () {
            document.querySelectorAll('.in-page-navigation-links').forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        });
    });
});