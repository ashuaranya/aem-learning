document.addEventListener('DOMContentLoaded', function () {

    document.querySelectorAll('.in-page-navigation-links').forEach(link => {
        link.addEventListener('click', function () {
            document.querySelectorAll('.in-page-navigation-links').forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        });
    });

    const dropdownTitle = document.querySelector('.dropdown-title');
    const dropdownContainer = document.querySelector('.dropdown-container');

    if (dropdownTitle && dropdownContainer) {
        dropdownContainer.classList.remove('active');

        dropdownTitle.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            dropdownContainer.classList.toggle('active');
        });
    }

    document.addEventListener('click', function (e) {
        if (!e.target.closest('.dropdown-container') && dropdownContainer) {
            dropdownContainer.classList.remove('active');
        }
    });
});