export interface IPokemon {
    ability: IAbility,
    is_hidden: boolean,
    slot: number
}

interface IAbility {
    name: string,
    url: string,
}