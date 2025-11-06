import React, { useState } from 'react';
import { SocialPost, GeneratedImage } from '../types';

const PlatformIcon: React.FC<{ platform: string, sizeClass?: string }> = ({ platform, sizeClass = 'text-lg' }) => {
    const lowerPlatform = platform.toLowerCase();
    if (lowerPlatform.includes('instagram')) return <i className={`fa-brands fa-instagram ${sizeClass}`} style={{color: '#E4405F'}}></i>;
    if (lowerPlatform.includes('facebook')) return <i className={`fa-brands fa-facebook ${sizeClass}`} style={{color: '#1877F2'}}></i>;
    if (lowerPlatform.includes('x') || lowerPlatform.includes('twitter')) return <i className={`fa-brands fa-twitter ${sizeClass}`} style={{color: '#1DA1F2'}}></i>;
    if (lowerPlatform.includes('linkedin')) return <i className={`fa-brands fa-linkedin ${sizeClass}`} style={{color: '#0A66C2'}}></i>;
    return <i className={`fa-solid fa-share-nodes ${sizeClass}`}></i>;
};

export const MissionPost: React.FC<{ post: SocialPost }> = ({ post }) => {
    const [selectedImageId, setSelectedImageId] = useState<string | null>(post.generated_images?.[0]?.id || null);
    
    const selectedImage = post.generated_images?.find(img => img.id === selectedImageId);

    return (
        <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
            {/* Post Header */}
            <div className="flex items-center gap-3 text-sm mb-3">
                <PlatformIcon platform={post.platform} />
                <span className="flex-grow text-slate-800 font-semibold truncate">{post.title}</span>
                <span className="text-xs text-slate-500 bg-slate-200 px-2 py-0.5 rounded-full whitespace-nowrap">{post.suggested_time}</span>
            </div>
            
            {/* Image selection */}
            {post.generated_images && post.generated_images.length > 0 && (
                <div className="space-y-2">
                    <h5 className="text-xs font-bold text-slate-600">Choose an Image:</h5>
                    <div className={`grid gap-2 ${post.generated_images.length > 1 ? 'grid-cols-3' : 'grid-cols-1'}`}>
                        {post.generated_images.map((image: GeneratedImage) => (
                            <div 
                                key={image.id} 
                                className={`relative group cursor-pointer rounded-md overflow-hidden border-2 ${selectedImageId === image.id ? 'border-indigo-500' : 'border-transparent hover:border-indigo-300'}`}
                                onClick={() => setSelectedImageId(image.id)}
                                role="button"
                                aria-pressed={selectedImageId === image.id}
                                aria-label={`Select image: ${image.description}`}
                            >
                                <img src={`data:image/png;base64,${image.base64}`} alt={image.description} className="w-full h-24 object-cover" />
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center">
                                    <i className="fa-solid fa-magnifying-glass text-white text-lg opacity-0 group-hover:opacity-100 transition-opacity"></i>
                                </div>
                                {selectedImageId === image.id && (
                                    <div className="absolute top-1 right-1 bg-indigo-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs shadow">
                                        <i className="fa-solid fa-check"></i>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    {/* Selected Image Details */}
                    {selectedImage && (
                        <div className="mt-2 text-xs bg-white p-2 rounded border border-slate-200 space-y-1">
                            <p><strong className="font-semibold text-slate-700">Description:</strong> {selectedImage.description}</p>
                            <p><strong className="font-semibold text-slate-700">Why this image:</strong> {selectedImage.rationale}</p>
                        </div>
                    )}
                </div>
            )}

            {!post.generated_images || post.generated_images.length === 0 && (
                <div className="text-center py-4">
                    <i className="fa-regular fa-image text-slate-400 text-2xl mb-2"></i>
                    <p className="text-xs text-slate-500">No image generated.</p>
                </div>
            )}
        </div>
    );
};
