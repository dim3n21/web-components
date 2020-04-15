const confirmButton = document.querySelector('button');
const modal = document.querySelector('wc-modal');

modal.addEventListener('confirm', () => {
console.log('Confirmed...');
});

modal.addEventListener('cancel', () => {
console.log('Cancelled...');
});

confirmButton.addEventListener('click', () => {
//  modal.setAttribute('opened', '');
if (!modal.isOpen) {
    modal.open();
    console.log('Opening...');
}
});