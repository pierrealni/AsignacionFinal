export class SortFilters {
	id: number;
	text: string;
	value:string
}
export class BookFilters {
	sortFilters:SortFilters[];
}
export class BookFilter{
	sortBy:string;
	pageSize:string;
	pageNumber:number;
	searchText:string;
}