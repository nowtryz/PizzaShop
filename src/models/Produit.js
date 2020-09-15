import { Schema } from 'mongoose'

export const Schema = mongoose.model('Produit', new Schema({
    nom : String,
    prix : float,
        }));

export default class {
    constructor(nom, prix) {
        this.nom = nom
        this.prix = prix
       
    }
}