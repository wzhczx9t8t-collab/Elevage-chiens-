function generateMockPayment(amountEUR, puppyName) {
    const btcAmount = (amountEUR / 50000).toFixed(6);
    const mockAddress = `bc1q${Math.random().toString(36).substring(2, 15)}`;
    return {
        address: mockAddress,
        amount: btcAmount,
        currency: 'BTC'
    };
}

function initCheckout() {
    const urlParams = new URLSearchParams(window.location.search);
    const puppyId = parseInt(urlParams.get('id'));
    
    const puppies = JSON.parse(localStorage.getItem('puppies') || '[]');
    const puppy = puppies.find(p => p.id === puppyId);
    
    if (!puppy) {
        window.location.href = 'catalog.html';
        return;
    }
    
    document.getElementById('summary-name').textContent = puppy.name;
    document.getElementById('summary-breed').textContent = puppy.breed;
    document.getElementById('summary-price').textContent = `${puppy.price} €`;
    document.getElementById('summary-image').src = puppy.image;
    
    const btcAmount = (puppy.price / 50000).toFixed(6);
    document.getElementById('crypto-amount').textContent = `${btcAmount} BTC`;
    
    const paymentForm = document.getElementById('payment-form');
    const paymentDetails = document.getElementById('payment-details');
    
    paymentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const buyerName = document.getElementById('buyer-name').value;
        const buyerEmail = document.getElementById('buyer-email').value;
        
        if (!buyerName || !buyerEmail) {
            alert('Veuillez remplir tous les champs');
            return;
        }
        
        const payment = generateMockPayment(puppy.price, puppy.name);
        
        paymentDetails.innerHTML = `
            <div class="payment-status pending">
                ⏳ En attente de paiement
            </div>
            <p><strong>Envoyez exactement :</strong></p>
            <div class="crypto-address">
                ${payment.amount} ${payment.currency}
            </div>
            <p><strong>À l'adresse :</strong></p>
            <div class="crypto-address">
                ${payment.address}
            </div>
            <p class="small">⚠️ Attention : le paiement doit être confirmé sur la blockchain.</p>
            <button id="simulate-payment" class="btn-primary">✅ Simuler la confirmation (démo)</button>
        `;
        
        document.getElementById('simulate-payment')?.addEventListener('click', () => {
            paymentDetails.innerHTML = `
                <div class="payment-status confirmed">
                    ✅ Paiement confirmé ! 
                    <br>Nous vous contacterons sous 24h.
                </div>
                <a href="index.html" class="btn-primary">Retour à l'accueil</a>
            `;
            
            const updatedPuppies = puppies.map(p => {
                if (p.id === puppy.id) {
                    return { ...p, available: false };
                }
                return p;
            });
            localStorage.setItem('puppies', JSON.stringify(updatedPuppies));
        });
    });
}

document.addEventListener('DOMContentLoaded', initCheckout);
