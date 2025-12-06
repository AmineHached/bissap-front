import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlockchainService } from '../../services/blockchain-service';
import { Block } from '../../models/block';

@Component({
  selector: 'app-chain-block',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chain-block-component.html',
  styleUrls: ['./chain-block-component.css'],
})
export class ChainBlockComponent implements OnInit {
  blocksFromApi = signal<Block[]>([]);
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  constructor(private readonly blockchainService: BlockchainService) {}

  ngOnInit(): void {
    this.fetchBlocks();
  }

  fetchBlocks(): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);
    
    this.blockchainService.getBlocks().subscribe({
      next: (blocks: Block[]) => {
        this.blocksFromApi.set(blocks);
        this.isLoading.set(false);
      },
      error: (error: any) => {
        console.error('Error fetching blockchain:', error);
        this.errorMessage.set('Failed to load blockchain data.');
        this.isLoading.set(false);
      },
    });
  }
}
