import { SITE_INFO } from '@/content/site';

export type LegalSection = {
    id: string;
    title: string;
    paragraphs?: string[];
    list?: string[];
};

export const LEGAL_NOTICE_SECTIONS: LegalSection[] = [
    {
        id: 'ml-editeur',
        title: '1. Éditeur du site',
        paragraphs: [
            `${SITE_INFO.name} — ${SITE_INFO.nature}`,
            `Éditeur / responsable de la publication : ${SITE_INFO.owner}. Adresse : ${SITE_INFO.address}. Contact : ${SITE_INFO.email} — ${SITE_INFO.phone}.`,
        ],
    },
    {
        id: 'ml-hebergeur',
        title: '2. Hébergement',
        paragraphs: [`Site hébergé par ${SITE_INFO.host.name} (${SITE_INFO.host.site}).`],
    },
    {
        id: 'ml-ip',
        title: '3. Propriété intellectuelle',
        paragraphs: [
            'Les contenus, marques, éléments graphiques et visuels présentés sur ce site sont protégés par le droit d’auteur et le droit des marques. Toute reproduction, adaptation ou diffusion non autorisée est interdite.',
        ],
    },
];

export const PRIVACY_POLICY_SECTIONS: LegalSection[] = [
    {
        id: 'pp-scope',
        title: '1. Portée',
        paragraphs: ['Cette politique explique comment sont traitées les données dans le cadre de cette démonstration sans backend.'],
    },
    {
        id: 'pp-data',
        title: '2. Données collectées',
        paragraphs: ['Aucune donnée personnelle n’est stockée côté serveur. Les formulaires sont uniquement utilisés en démonstration locale.'],
    },
    {
        id: 'pp-cookies',
        title: '3. Cookies',
        paragraphs: ['Seuls des cookies techniques peuvent être utilisés si nécessaire au fonctionnement. Aucun cookie publicitaire.'],
    },
    {
        id: 'pp-rights',
        title: '4. Vos droits',
        paragraphs: [`Pour toute question liée à la confidentialité : ${SITE_INFO.email}.`],
    },
];

export const TERMS_SECTIONS: LegalSection[] = [
    {
        id: 't-objet',
        title: '1. Objet',
        paragraphs: ['Les présentes conditions encadrent l’utilisation du site de démonstration Mystères à la carte.'],
    },
    {
        id: 't-service',
        title: '2. Nature du service',
        paragraphs: ['Le site présente un concept fictif et n’implique ni commande réelle, ni paiement, ni réservation ferme.'],
    },
    {
        id: 't-obligations',
        title: '3. Obligations utilisateur',
        list: [
            'Ne pas tenter d’altérer le fonctionnement du site ou d’accéder à des zones non publiques.',
            'Ne pas injecter de contenus illicites, malveillants ou portant atteinte aux droits de tiers.',
            'Respecter les lois et réglementations en vigueur.',
        ],
    },
    {
        id: 't-resp',
        title: '4. Responsabilité',
        paragraphs: ['Le site est fourni en l’état, sans garantie d’absence d’erreurs.'],
    },
    {
        id: 't-droit',
        title: '5. Droit applicable',
        paragraphs: ['Le présent site est soumis au droit français.'],
    },
];
