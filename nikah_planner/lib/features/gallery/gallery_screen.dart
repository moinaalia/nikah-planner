import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import '../../core/data/mock_data.dart';
import '../../core/theme/app_colors.dart';
import '../../core/theme/app_theme.dart';
import '../../core/widgets/wedding_widgets.dart';

class GalleryScreen extends StatefulWidget {
  const GalleryScreen({super.key});

  @override
  State<GalleryScreen> createState() => _GalleryScreenState();
}

class _GalleryScreenState extends State<GalleryScreen> {
  String _category = 'All';
  final Set<int> _liked = MockData.galleryItems.where((i) => i.liked).map((i) => i.id).toSet();
  GalleryItem? _selected;

  @override
  Widget build(BuildContext context) {
    final filtered = MockData.galleryItems
        .where((i) => _category == 'All' || i.category == _category)
        .toList();

    return Stack(
      children: [
        CustomScrollView(
          slivers: [
            SliverToBoxAdapter(
              child: PageHeader(
                title: 'Decoration Gallery',
                subtitle: '${MockData.galleryItems.length} inspiration photos saved',
                gradient: const LinearGradient(
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                  colors: [Color(0xFFFAF0F0), AppColors.background],
                ),
                trailing: const AddFabButton(),
              ),
            ),
            SliverToBoxAdapter(
              child: SizedBox(
                height: 40,
                child: ListView(
                  scrollDirection: Axis.horizontal,
                  padding: const EdgeInsets.symmetric(horizontal: 20),
                  children: MockData.galleryCategories.map((cat) {
                    return Padding(
                      padding: const EdgeInsets.only(right: 8),
                      child: FilterChipButton(
                        label: cat,
                        selected: _category == cat,
                        onTap: () => setState(() => _category = cat),
                      ),
                    );
                  }).toList(),
                ),
              ),
            ),
            SliverPadding(
              padding: const EdgeInsets.all(20),
              sliver: SliverGrid(
                gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 2,
                  crossAxisSpacing: 12,
                  mainAxisSpacing: 12,
                  childAspectRatio: 0.85,
                ),
                delegate: SliverChildBuilderDelegate(
                  (context, i) {
                    final item = filtered[i];
                    return GestureDetector(
                      onTap: () => setState(() => _selected = item),
                      child: ClipRRect(
                        borderRadius: BorderRadius.circular(16),
                        child: Stack(
                          fit: StackFit.expand,
                          children: [
                            CachedNetworkImage(
                              imageUrl: item.imageUrl,
                              fit: BoxFit.cover,
                              placeholder: (_, __) => Container(color: item.color),
                              errorWidget: (_, __, ___) => Container(color: item.color, child: const Icon(Icons.image)),
                            ),
                            Container(
                              decoration: BoxDecoration(
                                gradient: LinearGradient(
                                  begin: Alignment.topCenter,
                                  end: Alignment.bottomCenter,
                                  colors: [Colors.transparent, Colors.black.withValues(alpha: 0.5)],
                                  stops: const [0.5, 1.0],
                                ),
                              ),
                            ),
                            Positioned(
                              top: 8,
                              right: 8,
                              child: GestureDetector(
                                onTap: () {
                                  setState(() {
                                    if (_liked.contains(item.id)) {
                                      _liked.remove(item.id);
                                    } else {
                                      _liked.add(item.id);
                                    }
                                  });
                                },
                                child: Container(
                                  width: 32,
                                  height: 32,
                                  decoration: BoxDecoration(
                                    color: Colors.white.withValues(alpha: 0.9),
                                    shape: BoxShape.circle,
                                  ),
                                  child: Icon(
                                    _liked.contains(item.id) ? Icons.favorite : Icons.favorite_border,
                                    size: 16,
                                    color: _liked.contains(item.id) ? AppColors.error : AppColors.textMuted,
                                  ),
                                ),
                              ),
                            ),
                            Positioned(
                              left: 12,
                              right: 12,
                              bottom: 12,
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(item.title, style: const TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.w500)),
                                  const SizedBox(height: 4),
                                  Container(
                                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                                    decoration: BoxDecoration(
                                      color: Colors.white.withValues(alpha: 0.25),
                                      borderRadius: BorderRadius.circular(8),
                                    ),
                                    child: Text(item.category, style: const TextStyle(color: Colors.white, fontSize: 10)),
                                  ),
                                ],
                              ),
                            ),
                          ],
                        ),
                      ),
                    );
                  },
                  childCount: filtered.length,
                ),
              ),
            ),
            const SliverToBoxAdapter(child: SizedBox(height: 80)),
          ],
        ),
        if (_selected != null) _Lightbox(
          item: _selected!,
          liked: _liked.contains(_selected!.id),
          onClose: () => setState(() => _selected = null),
          onToggleLike: () {
            setState(() {
              if (_liked.contains(_selected!.id)) {
                _liked.remove(_selected!.id);
              } else {
                _liked.add(_selected!.id);
              }
            });
          },
        ),
      ],
    );
  }
}

class _Lightbox extends StatelessWidget {
  const _Lightbox({
    required this.item,
    required this.liked,
    required this.onClose,
    required this.onToggleLike,
  });

  final GalleryItem item;
  final bool liked;
  final VoidCallback onClose;
  final VoidCallback onToggleLike;

  @override
  Widget build(BuildContext context) {
    return Material(
      color: Colors.black.withValues(alpha: 0.92),
      child: SafeArea(
        child: Column(
          children: [
            Padding(
              padding: const EdgeInsets.all(16),
              child: Row(
                children: [
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(item.title, style: playfair(context, size: 18, color: Colors.white)),
                        Text(item.category, style: dmSans(context, size: 12, color: Colors.white60)),
                      ],
                    ),
                  ),
                  IconButton(
                    onPressed: onClose,
                    icon: const Icon(Icons.close, color: Colors.white),
                    style: IconButton.styleFrom(backgroundColor: Colors.white24),
                  ),
                ],
              ),
            ),
            Expanded(
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: ClipRRect(
                  borderRadius: BorderRadius.circular(16),
                  child: CachedNetworkImage(imageUrl: item.imageUrl, fit: BoxFit.contain, width: double.infinity),
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(16),
              child: ElevatedButton.icon(
                onPressed: onToggleLike,
                icon: Icon(liked ? Icons.favorite : Icons.favorite_border, color: Colors.white),
                label: Text(liked ? 'Saved to Favourites' : 'Save to Favourites'),
                style: ElevatedButton.styleFrom(
                  backgroundColor: liked ? AppColors.error : Colors.white24,
                  foregroundColor: Colors.white,
                  padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
