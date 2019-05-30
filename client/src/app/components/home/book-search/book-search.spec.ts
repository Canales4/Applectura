import { BsModalService } from 'ngx-bootstrap/modal';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { BookSearchComponent } from './book-search.component';
import { ApiBooksService } from 'src/app/services/api-books.service';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ServerService } from '../../../services/server.service';
import { NavbarService } from '../../../services/navbar.service';
import { FormsModule } from '@angular/forms';

describe('BookSearchComponent', () => {
  let app: BookSearchComponent;
  let fixture: ComponentFixture<BookSearchComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [FormsModule, NgbModule],
        declarations: [BookSearchComponent],
// tslint:disable-next-line: max-line-length
        providers: [{ provide: ApiBooksService, useValue: ApiBooksService }, { provide: ServerService, useValue: ServerService }, { provide: NavbarService, useValue: NavbarService}, { provide: BsModalService, useValue: BsModalService}]
    });
    fixture = TestBed.createComponent(BookSearchComponent);
    app = fixture.componentInstance;
  }));

  it('titulo es busacr libros', () => {
    const title = document.getElementById('title').innerHTML;
    expect(title).toBe('Buscar Libros');
  });
  it('select titulo', async(() => {
    app.select('title');
    expect(app.autorSel).toBe(false);
    expect(app.isbnSel).toBe(false);
    expect(app.titleSel).toBe(true);
  }));
});
