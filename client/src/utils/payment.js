function makePayment() {
    IremboPay.initiate({
        publicKey: "pk_live_15a0eeb4cf094da993d347a5a1a241db",
        invoiceNumber: "880227612956",
        locale: IremboPay.locale.EN,
        callback: (err, resp) => {
            if (!err) {
             console.log(resp);
                // Perform actions on success
                // IremboPay.closeModal();
            } else {
                // Perform actions on error
            }
        }
    })
}
